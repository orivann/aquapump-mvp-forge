# --------------------------
# Base image for frontend
# --------------------------
FROM node:20-alpine AS base

ARG UID=1001
ARG GID=1001

# Create a non-root user
RUN addgroup -g $GID -S appgroup && adduser -u $UID -G appgroup -S appuser

WORKDIR /app

# Copy package files only to leverage Docker cache
COPY frontend/package.json frontend/package-lock.json* ./

# --------------------------
# Development stage
# --------------------------
FROM base AS dev

# Copy everything else
COPY frontend/ .

# Install dependencies for development
RUN npm install --legacy-peer-deps && \
    apk add --no-cache python3 py3-pip && \
    pip install playwright && \
    python3 -m playwright install

# Add entrypoint script
COPY infra/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "dev"]

# --------------------------
# Production build stage
# --------------------------
FROM base AS build

# Copy package files first
COPY frontend/package.json frontend/package-lock.json* ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the frontend source code
COPY frontend/ .

# Build the frontend
RUN npm run build

# --------------------------
# Production runtime stage
# --------------------------
FROM nginx:stable-alpine AS prod

# Copy custom nginx config
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

