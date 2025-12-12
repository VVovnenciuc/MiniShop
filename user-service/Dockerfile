# user-service/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY user-service/package*.json ./
RUN npm ci --only=production

# Copiem doar ce e necesar pentru Prisma generate
COPY user-service/prisma ./prisma
RUN npx prisma generate

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY user-service/src ./src
COPY user-service/package.json ./

# La runtime facem migrate + seed doar în local/dev
# În Kubernetes o să facem cu Kubernetes Job separat
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "src/server.js"]
