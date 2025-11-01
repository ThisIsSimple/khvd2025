# SSL Certificate Installation Guide

This directory contains SSL certificates for HTTPS support in KHVD 2025.

## Quick Start

### For Development/Testing (Self-Signed Certificate)

1. **Generate a self-signed certificate:**
   ```bash
   ./scripts/generate-ssl-cert.sh
   ```

2. **Start Docker Compose:**
   ```bash
   docker compose up -d
   ```

3. **Access your site:**
   - HTTPS: https://localhost
   - HTTP: http://localhost (will redirect to HTTPS)

> **Note:** Your browser will show a security warning for self-signed certificates. This is normal for development. Click "Advanced" and proceed.

---

## For Production (Let's Encrypt)

Let's Encrypt provides free, automated SSL certificates that are trusted by all browsers.

### Option 1: Using Certbot (Recommended)

1. **Update your `.env` file:**
   ```env
   DOMAIN=your-domain.com
   SSL_EMAIL=your-email@example.com
   ORIGIN=https://your-domain.com
   ```

2. **Ensure DNS is configured:**
   - Point your domain to your server's IP address
   - Wait for DNS propagation (can take up to 48 hours)

3. **Initial certificate generation:**
   ```bash
   docker compose run --rm certbot certonly \
     --webroot \
     --webroot-path=/var/www/certbot \
     --email ${SSL_EMAIL} \
     --agree-tos \
     --no-eff-email \
     -d ${DOMAIN}
   ```

4. **Update NGINX configuration:**
   Edit `nginx/conf.d/default.conf` and update SSL certificate paths:
   ```nginx
   ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
   ```

5. **Restart NGINX:**
   ```bash
   docker compose restart nginx
   ```

### Option 2: Using Docker Compose Certbot Service

1. **Add Certbot service to `docker compose.yml`:**
   ```yaml
   certbot:
     image: certbot/certbot
     container_name: khvd-certbot
     volumes:
       - ./nginx/ssl:/etc/letsencrypt
       - ./nginx/certbot:/var/www/certbot
     entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
   ```

2. **Initial certificate issuance:**
   ```bash
   docker compose run --rm certbot certonly \
     --webroot -w /var/www/certbot \
     --email ${SSL_EMAIL} \
     -d ${DOMAIN} \
     --agree-tos
   ```

3. **Start Certbot for auto-renewal:**
   ```bash
   docker compose up -d certbot
   ```

---

## Certificate Renewal

### Manual Renewal
```bash
docker compose run --rm certbot renew
docker compose restart nginx
```

### Automatic Renewal (Recommended)
Let's Encrypt certificates are valid for 90 days. The Certbot container automatically checks for renewal twice daily.

To verify auto-renewal is working:
```bash
docker compose logs certbot
```

---

## Troubleshooting

### "Certificate not found" error
- Ensure certificates exist in `nginx/ssl/` directory
- For development: Run `./scripts/generate-ssl-cert.sh`
- For production: Run Certbot commands above

### Browser shows "Not Secure" warning
- **Self-signed cert:** This is expected. Click "Advanced" → "Proceed to localhost"
- **Let's Encrypt cert:** Check that:
  - Domain DNS is correctly configured
  - Certificate files exist in correct paths
  - NGINX has been restarted after certificate installation

### Let's Encrypt rate limits
- Let's Encrypt has rate limits (50 certificates per domain per week)
- Use `--staging` flag for testing: `certbot certonly --staging ...`
- Staging certificates won't be trusted by browsers but won't count toward limits

### NGINX fails to start
```bash
# Check NGINX configuration
docker compose exec nginx nginx -t

# View NGINX logs
docker compose logs nginx
```

---

## Security Best Practices

1. **Keep certificates secure:**
   - Never commit `.pem`, `.key`, or `.crt` files to version control
   - Set proper file permissions (600 for private keys)

2. **Enable HSTS (after testing):**
   Uncomment this line in `nginx/conf.d/default.conf`:
   ```nginx
   add_header Strict-Transport-Security "max-age=63072000" always;
   ```

3. **Monitor expiration:**
   Let's Encrypt certificates expire after 90 days. Ensure auto-renewal is working.

4. **Use strong SSL configuration:**
   The provided NGINX config already includes modern SSL settings:
   - TLS 1.2 and 1.3 only
   - Strong cipher suites
   - Perfect Forward Secrecy (PFS)

---

## Testing SSL Configuration

Use SSL Labs to test your SSL configuration:
- https://www.ssllabs.com/ssltest/

Target rating: A or A+

---

## File Structure

```
nginx/ssl/
├── README.md           # This file
├── .gitkeep           # Keep directory in git
├── cert.pem           # SSL certificate (gitignored)
├── key.pem            # Private key (gitignored)
└── live/              # Let's Encrypt certificates (if using Certbot)
    └── your-domain/
        ├── fullchain.pem
        └── privkey.pem
```

---

## Additional Resources

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://eff-certbot.readthedocs.io/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [NGINX SSL Termination Guide](https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/)
