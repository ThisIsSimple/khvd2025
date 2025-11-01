#!/bin/bash

# KHVD 2025 - Let's Encrypt Certificate Initial Issuance Script
# This script issues SSL certificates using Let's Encrypt via Certbot

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  KHVD 2025 Let's Encrypt Certificate  ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Parse arguments
DOMAIN=$1
EMAIL=$2
STAGING=${3:-false}

# Show usage if arguments are missing
if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo ""
    echo "Usage: $0 <domain> <email> [staging]"
    echo ""
    echo "Arguments:"
    echo "  domain  - Your domain name (e.g., khvd2025.com)"
    echo "  email   - Your email for Let's Encrypt notifications"
    echo "  staging - Optional: Use 'staging' for testing (doesn't count toward rate limits)"
    echo ""
    echo "Examples:"
    echo "  $0 khvd2025.com admin@khvd2025.com"
    echo "  $0 khvd2025.com admin@khvd2025.com staging"
    exit 1
fi

# Determine staging flag
STAGING_FLAG=""
if [ "$STAGING" = "staging" ]; then
    STAGING_FLAG="--staging"
    echo -e "${YELLOW}⚠️  Running in STAGING mode (test certificates)${NC}"
    echo ""
fi

# Pre-flight checks
echo -e "${BLUE}Pre-flight checks...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    echo "Please start Docker and try again"
    exit 1
fi
echo -e "${GREEN}✓ Docker is running${NC}"

# Check if nginx/certbot directory exists
if [ ! -d "nginx/certbot" ]; then
    echo -e "${YELLOW}Creating nginx/certbot directory...${NC}"
    mkdir -p nginx/certbot
fi
echo -e "${GREEN}✓ Certbot directory exists${NC}"

# Check if NGINX is running
if ! docker ps | grep -q khvd-nginx; then
    echo -e "${YELLOW}⚠️  NGINX container is not running${NC}"
    echo "Starting Docker Compose services..."
    docker-compose up -d nginx
    echo -e "${GREEN}✓ NGINX started${NC}"
    sleep 3
else
    echo -e "${GREEN}✓ NGINX is running${NC}"
fi

echo ""
echo -e "${BLUE}Certificate Request Details:${NC}"
echo "  Domain: $DOMAIN"
echo "  Email:  $EMAIL"
echo "  Mode:   $([ "$STAGING" = "staging" ] && echo "STAGING (test)" || echo "PRODUCTION")"
echo ""

# Confirmation prompt
read -p "Continue with certificate issuance? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Operation cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Requesting certificate from Let's Encrypt...${NC}"
echo ""

# Run Certbot
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    $STAGING_FLAG \
    -d "$DOMAIN"

# Check if certificate was issued successfully
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ Certificate issued successfully!  ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""

    if [ "$STAGING" = "staging" ]; then
        echo -e "${YELLOW}⚠️  This is a STAGING certificate (not trusted by browsers)${NC}"
        echo "To issue a production certificate, run:"
        echo -e "${BLUE}  $0 $DOMAIN $EMAIL${NC}"
        echo ""
    else
        echo "Certificate location:"
        echo "  Full chain: /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
        echo "  Private key: /etc/letsencrypt/live/$DOMAIN/privkey.pem"
        echo ""
        echo -e "${YELLOW}Next steps:${NC}"
        echo ""
        echo "1. Update NGINX configuration to use the new certificates:"
        echo "   Edit: nginx/conf.d/default.conf"
        echo ""
        echo "   Change the SSL certificate paths to:"
        echo -e "${BLUE}   ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;${NC}"
        echo -e "${BLUE}   ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;${NC}"
        echo ""
        echo "2. Restart NGINX to apply changes:"
        echo -e "${BLUE}   docker-compose restart nginx${NC}"
        echo ""
        echo "3. Verify your site:"
        echo -e "${BLUE}   https://$DOMAIN${NC}"
        echo ""
        echo "4. Test SSL configuration:"
        echo -e "${BLUE}   https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN${NC}"
        echo ""
    fi

    echo -e "${GREEN}Certificate will auto-renew every 90 days via Certbot service${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  ✗ Certificate issuance failed        ${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo -e "${YELLOW}Common issues:${NC}"
    echo "  1. DNS not configured correctly (domain not pointing to this server)"
    echo "  2. Port 80 not accessible from the internet"
    echo "  3. Domain validation failed"
    echo "  4. Rate limit exceeded (try staging mode first)"
    echo ""
    echo "Troubleshooting:"
    echo "  - Check DNS: dig $DOMAIN"
    echo "  - Check port 80: curl http://$DOMAIN/.well-known/acme-challenge/test"
    echo "  - View NGINX logs: docker-compose logs nginx"
    echo "  - Try staging mode: $0 $DOMAIN $EMAIL staging"
    echo ""
    exit 1
fi
