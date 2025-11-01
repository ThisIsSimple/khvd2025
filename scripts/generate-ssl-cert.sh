#!/bin/bash

# KHVD 2025 - Self-Signed SSL Certificate Generator
# This script generates a self-signed SSL certificate for development/testing
# For production, use Let's Encrypt instead (see nginx/ssl/README.md)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SSL_DIR="nginx/ssl"
CERT_FILE="$SSL_DIR/cert.pem"
KEY_FILE="$SSL_DIR/key.pem"
DAYS_VALID=365

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  KHVD 2025 SSL Certificate Generator  ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if OpenSSL is installed
if ! command -v openssl &> /dev/null; then
    echo -e "${RED}Error: OpenSSL is not installed${NC}"
    echo "Please install OpenSSL first:"
    echo "  - macOS: brew install openssl"
    echo "  - Ubuntu/Debian: sudo apt-get install openssl"
    echo "  - CentOS/RHEL: sudo yum install openssl"
    exit 1
fi

# Create SSL directory if it doesn't exist
if [ ! -d "$SSL_DIR" ]; then
    echo -e "${YELLOW}Creating SSL directory: $SSL_DIR${NC}"
    mkdir -p "$SSL_DIR"
fi

# Check if certificates already exist
if [ -f "$CERT_FILE" ] || [ -f "$KEY_FILE" ]; then
    echo -e "${YELLOW}Warning: SSL certificates already exist${NC}"
    echo "Existing files:"
    [ -f "$CERT_FILE" ] && echo "  - $CERT_FILE"
    [ -f "$KEY_FILE" ] && echo "  - $KEY_FILE"
    echo ""
    read -p "Do you want to overwrite them? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Operation cancelled${NC}"
        exit 0
    fi
fi

# Prompt for certificate details
echo -e "${YELLOW}Enter certificate details (or press Enter for defaults)${NC}"
echo ""

read -p "Country Code (2 letters) [KR]: " COUNTRY
COUNTRY=${COUNTRY:-KR}

read -p "State/Province [Seoul]: " STATE
STATE=${STATE:-Seoul}

read -p "City [Seoul]: " CITY
CITY=${CITY:-Seoul}

read -p "Organization [KHVD 2025]: " ORG
ORG=${ORG:-"KHVD 2025"}

read -p "Common Name (domain) [localhost]: " CN
CN=${CN:-localhost}

read -p "Email [admin@khvd2025.com]: " EMAIL
EMAIL=${EMAIL:-admin@khvd2025.com}

echo ""
echo -e "${GREEN}Generating self-signed SSL certificate...${NC}"

# Generate certificate
openssl req -x509 -nodes -days $DAYS_VALID -newkey rsa:2048 \
    -keyout "$KEY_FILE" \
    -out "$CERT_FILE" \
    -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORG/CN=$CN/emailAddress=$EMAIL" \
    2>/dev/null

# Set proper permissions
chmod 600 "$KEY_FILE"
chmod 644 "$CERT_FILE"

echo -e "${GREEN}✓ SSL certificate generated successfully!${NC}"
echo ""
echo "Certificate details:"
echo "  - Certificate: $CERT_FILE"
echo "  - Private Key: $KEY_FILE"
echo "  - Valid for: $DAYS_VALID days"
echo "  - Common Name: $CN"
echo ""

# Display certificate info
echo -e "${YELLOW}Certificate Information:${NC}"
openssl x509 -in "$CERT_FILE" -noout -subject -issuer -dates

echo ""
echo -e "${GREEN}Next steps:${NC}"
echo "1. Start Docker Compose:"
echo "   ${YELLOW}docker-compose up -d${NC}"
echo ""
echo "2. Access your site:"
echo "   ${YELLOW}https://$CN${NC}"
echo "   (You may see a browser warning - this is normal for self-signed certs)"
echo ""
echo -e "${YELLOW}⚠️  Note: For production, use Let's Encrypt instead${NC}"
echo "   See nginx/ssl/README.md for instructions"
echo ""
