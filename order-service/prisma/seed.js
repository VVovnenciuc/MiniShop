const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Doar un exemplu de comandă goală – în realitate se creează prin API
  console.log('Order seed – skip pentru demo, comenzi create prin API');
}

main().finally(async () => await prisma.$disconnect());