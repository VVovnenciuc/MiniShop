FROM node:20-alpine AS builder
WORKDIR /app
COPY user-service/package*.json ./
RUN npm ci

COPY user-service/prisma ./prisma
RUN npx prisma generate

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY user-service/src ./src

EXPOSE 3000
CMD ["node", "src/server.js"]
