FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

# Server listens on 3001 by default (see server/server.ts). Expose 3001
# and use the `start` script which runs the server via ts-node in dev.
EXPOSE 3001

CMD ["npm", "run", "start"]

