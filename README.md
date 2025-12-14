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

MiniShop/
├── README.md                              ← Documentație completă + diagrame + demo
├── Makefile                               ← Comenzi rapide (make up, make nuke etc.)
├── docker-compose.yml                     ← Global: ridică toate 4 servicii + 4 DB-uri local
├── .gitignore
├── .github/
│   └── workflows/                         ← Opțional GitHub Actions fallback
│
├── jenkins/
│   └── Jenkinsfile                        ← Pipeline CI/CD complet (build, test, push ECR, deploy Helm)
│
├── terraform/
│   ├── main.tf                            ← Provider + modules call
│   ├── variables.tf
│   ├── outputs.tf
│   ├── terraform.tfvars.example
│   ├── modules/
│   │   ├── vpc/                           ← VPC, subnets, NAT etc.
│   │   ├── eks/                           ← EKS cluster + node groups
│   │   ├── rds/                           ← 4 RDS instances (sau 1 multi-DB)
│   │   ├── ecr/                           ← Repositories pentru imagini
│   │   └── iam/                           ← Roles pentru Jenkins/ECR
│   └── backend.tf                         ← S3 backend pentru tfstate
│
├── helm/
│   └── minishop/                          ← Umbrella chart
│       ├── Chart.yaml
│       ├── values.yaml                    ← Valori globale + override-uri
│       ├── templates/
│       │   ├── ingress.yaml
│       │   └── NOTES.txt
│       └── charts/                        ← Subcharts (copiate din servicii)
│           ├── user-service/
│           │   ├── Chart.yaml
│           │   ├── values.yaml
│           │   └── templates/
│           │       ├── deployment.yaml
│           │       ├── service.yaml
│           │       ├── secret.yaml
│           │       ├── migration-job.yaml
│           │       └── seed-job.yaml
│           ├── product-service/
│           ├── order-service/
│           └── payment-service/
│
├── user-service/
│   ├── src/                               ← Cod Node.js (server.js, routes, controllers etc.)
│   ├── prisma/                            ← schema.prisma, migrations, seed.js
│   ├── Dockerfile
│   ├── docker-compose.yml                 ← Individual pentru test rapid
│   ├── package.json
│   ├── .env.example
│   └── helm/user-service/                 ← Chart individual (copiat în umbrella)
│
├── product-service/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── helm/product-service/
│
├── order-service/
│   ├── src/                               ← include services/productClient.js, userClient.js
│   ├── prisma/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   └── helm/order-service/
│
└── payment-service/
    ├── src/                               ← include services/orderClient.js, userClient.js
    ├── prisma/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── package.json
    └── helm/payment-service/





