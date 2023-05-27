FROM node:18.13.0-slim AS builder

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
