FROM public.ecr.aws/docker/library/node:20-alpine AS base

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./

# --------------------------
# Development stage
# --------------------------
FROM base AS dev

RUN npm install
COPY backend/ .

EXPOSE 3001
CMD ["npm", "run", "start"]

# --------------------------
# Production build stage
# --------------------------
FROM base AS build

RUN npm ci
COPY backend/ .
RUN npm run build

# --------------------------
# Production runtime stage
# --------------------------
FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/index.js"]
