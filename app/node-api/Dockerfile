FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN adduser -D appuser
USER appuser

EXPOSE 5000
CMD ["npm", "start"]
