const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@minishop.com' },
    update: {},
    create: {
      email: 'admin@minishop.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User'
    }
  });
  console.log('Seed done');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
