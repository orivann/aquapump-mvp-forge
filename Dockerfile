# Stage 1: Build the React application
# Use a specific Node.js LTS version on a lightweight Alpine base
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies using 'npm ci' for faster, more reliable builds in CI/CD
RUN npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the production-ready static assets
RUN npm run build

# Stage 2: Serve the application using a lightweight Nginx server
# Use a stable, lightweight Alpine-based Nginx image
FROM nginx:stable-alpine

# Copy the custom Nginx configuration file
# This replaces the default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the container will listen on
EXPOSE 8080

# The default command for the nginx image is to start the server.
# We add this to keep the container running in the foreground.
CMD ["nginx", "-g", "daemon off;"]
