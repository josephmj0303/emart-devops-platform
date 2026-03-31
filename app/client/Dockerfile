FROM node:18-alpine AS build

WORKDIR /app

# Better caching
COPY package*.json ./
RUN npm install

COPY . .

# 🔥 Fix for Angular 12 + Node 18
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
