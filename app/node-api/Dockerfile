FROM node:18-alpine

WORKDIR /app

# 🔥 ADD THIS LINE (CRITICAL FIX)
RUN apk update && apk upgrade

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
