FROM node:20-alpine AS builder
WORKDIR /app
COPY product-service/package*.json ./
RUN npm ci --only=production
COPY product-service/prisma ./prisma
RUN npx prisma generate

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY product-service/src ./src
COPY product-service/package.json ./

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/server.js"]
