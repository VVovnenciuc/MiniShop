#       BUILD
FROM node:20-alpine AS builder
WORKDIR /app
COPY user-service/package*.json ./
RUN npm ci --only=production

#       FINAL
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY user-service/src ./src
COPY user-service/.env.example .env

EXPOSE 3000
CMD ["node", "src/server.js"]
