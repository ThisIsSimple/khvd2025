# Docker Deployment Guide

This guide explains how to build and run the KHVD 2025 Exhibition project using Docker.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- MySQL database running on host machine or accessible server

## Quick Start

### 1. Prepare Environment Variables

Copy the example environment file and fill in your database credentials:

```bash
cp .env.example .env
```

Edit `.env` file with your MySQL database credentials:

```env
DB_HOST=host.docker.internal  # For host machine's MySQL
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=khvd_2025
DB_CONNECTION_LIMIT=10
```

**Note**: Use `host.docker.internal` as DB_HOST to connect to MySQL running on your host machine.

### 2. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:3000`

## Manual Docker Build

If you prefer to use Docker without Docker Compose:

### Build the Image

```bash
docker build -t khvd-2025:latest .
```

### Run the Container

```bash
docker run -d \
  --name khvd-2025 \
  -p 3000:3000 \
  --add-host host.docker.internal:host-gateway \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=3306 \
  -e DB_USER=your_db_user \
  -e DB_PASSWORD=your_db_password \
  -e DB_NAME=khvd_2025 \
  -e DB_CONNECTION_LIMIT=10 \
  -e NODE_ENV=production \
  khvd-2025:latest
```

## Database Setup

Before running the application, ensure your MySQL database is set up:

1. Create the database:
```sql
CREATE DATABASE IF NOT EXISTS khvd_2025 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Run the schema:
```bash
mysql -u your_db_user -p khvd_2025 < database/schema.sql
```

## Docker Architecture

The Dockerfile uses a multi-stage build process:

1. **Builder Stage** (Node 22 Alpine):
   - Installs all dependencies
   - Builds the SvelteKit application
   - Removes devDependencies

2. **Production Stage** (Node 22 Alpine):
   - Copies only production files
   - Minimal image size
   - Runs the built application

## Port Configuration

- **Container Port**: 3000 (default SvelteKit)
- **Host Port**: 3000 (configurable in docker-compose.yml)

To use a different host port:

```yaml
# docker-compose.yml
ports:
  - "8080:3000"  # Maps host port 8080 to container port 3000
```

## Health Check

The container includes a health check that runs every 30 seconds:

```bash
# Check container health status
docker ps
docker inspect --format='{{.State.Health.Status}}' khvd-2025
```

## Troubleshooting

### Cannot connect to MySQL

1. Verify MySQL is running on host:
```bash
mysql -u your_db_user -p -e "SELECT 1"
```

2. Check if host.docker.internal resolves:
```bash
docker run --rm khvd-2025:latest ping -c 1 host.docker.internal
```

3. For Linux, you may need to use your host IP instead:
```bash
ip addr show docker0 | grep inet
# Use the IP address as DB_HOST
```

### View application logs

```bash
# Docker Compose
docker-compose logs -f khvd-2025

# Docker
docker logs -f khvd-2025
```

### Access container shell

```bash
# Docker Compose
docker-compose exec khvd-2025 sh

# Docker
docker exec -it khvd-2025 sh
```

### Rebuild after changes

```bash
# Docker Compose
docker-compose up -d --build

# Docker
docker build -t khvd-2025:latest . && docker run ...
```

## Production Considerations

### Environment Variables

For production, consider using:
- Docker secrets for sensitive data
- External configuration management
- Proper ORIGIN setting for CORS

### Networking

For production deployment with external MySQL:
- Use proper network configuration
- Set up firewall rules
- Use TLS/SSL for database connections

### Reverse Proxy

Consider using Nginx or Traefik as a reverse proxy:

```nginx
# Example Nginx configuration
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Performance

The Docker image is optimized for production:
- Multi-stage build reduces image size
- Alpine Linux base (minimal footprint)
- Production-only dependencies
- Built application (no build step at runtime)

Typical image size: ~200MB

## Support

For issues related to Docker deployment, check:
1. Docker logs: `docker-compose logs`
2. Container health: `docker ps`
3. Database connectivity: Test from container shell
