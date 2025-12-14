const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Payment seed – skip, plăți create prin API');
}

main().finally(async () => await prisma.$disconnect());