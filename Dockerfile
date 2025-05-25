# Use official Node.js image
FROM node:18-slim

# Install necessary dependencies for Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libxss1 \
    libgbm1 \
    libdrm2 \
    libxshmfence1 \
    libglu1-mesa \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Install node dependencies
RUN npm install

# Disable Chromium sandbox (safe in Docker)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Run your script
CMD ["node", "sendQuote.js"]
