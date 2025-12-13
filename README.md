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


Cum testezi Helm local (cu Minikube sau Kind)

Bashhelm upgrade --install user-service ./user-service/helm/user-service \
  --set image.repository=yourname/user-service \
  --set image.tag=latest \
  --set database.url="postgresql://postgres:password@host.minikube.internal:5432/usersdb"

helm/
├── minishop-chart/            ← umbrella chart
│   └── charts/
│       ├── user-service/
│       ├── product-service/
│       ├── order-service/
│       └── payment-service/
└── user-service/              ← chart separat (pentru dezvoltare individuală)

MiniShop/
├── user-service/
│   ├── src/                  ← codul din mesajele anterioare
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   ├── Dockerfile            ← final, explicat mai jos
│   ├── docker-compose.yml    ← doar pentru local / demo
│   ├── .env.example
│   ├── .dockerignore
│   ├── package.json
│   └── helm/
│       └── user-service/     ← Helm chart complet
│           ├── Chart.yaml
│           ├── values.yaml
│           ├── templates/
│           │   ├── deployment.yaml
│           │   ├── service.yaml
│           │   ├── secret.yaml
│           │   └── _helpers.tpl
│           └── .helmignore
├── product-service/
│   ├── src/
│   │   ├── routes/product.routes.js
│   │   ├── controllers/product.controller.js
│   │   ├── middleware/auth.middleware.js   ← copiat din user-service
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── helm/
│   │   └── product-service/                ← chart identic ca structură
│   ├── .env.example
│   ├── package.json
│   └── tests/ (opțional)
