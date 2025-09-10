FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

RUN ls -l /app/dist

EXPOSE 3001

CMD ["npm", "run", "serve"]
