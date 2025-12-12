# MiniShop
Mini online shop

# Prima dată
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate dev --name init
node prisma/seed.js

# Development
npm run dev

# Production (în Docker)
docker build -t user-service .
docker run -p 3000:3000 -e DATABASE_URL=postgresql://... user-service


pornire local cu docker compose:

cd user-service
docker compose up --build
# → vezi loguri: Connected to PostgreSQL → user-service running
# Test: curl http://localhost:3000/health
