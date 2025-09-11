FROM node:20-alpine AS base

ARG UID=1001
ARG GID=1001

RUN addgroup -g $GID -S appgroup && adduser -u $UID -G appgroup -S appuser

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./

# --------------------------
# Development stage
# --------------------------
FROM base AS dev

COPY frontend/ .

RUN npm install --legacy-peer-deps

COPY infra/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "dev"]

# --------------------------
# Production build stage
# --------------------------
FROM base AS build

COPY frontend/ .
RUN npm ci && npm run build

# --------------------------
# Production runtime stage
# --------------------------
FROM nginx:stable-alpine AS prod

COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
