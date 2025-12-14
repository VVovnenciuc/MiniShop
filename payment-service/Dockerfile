FROM node:20-alpine AS builder
WORKDIR /app
COPY payment-service/package*.json ./
RUN npm ci --only=production
COPY payment-service/prisma ./prisma
RUN npx prisma generate

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY payment-service/src ./src
COPY payment-service/package.json ./

ENV NODE_ENV=production
EXPOSE 3003
CMD ["node", "src/server.js"]