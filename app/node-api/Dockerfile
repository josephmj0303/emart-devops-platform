FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN useradd -m appuser
USER appuser

EXPOSE 5000
CMD ["npm", "start"]
