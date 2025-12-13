const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  { name: 'Laptop Gaming', description: 'RTX 4070, i7, 16GB RAM', price: 5999.99, stock: 10, imageUrl: 'https://example.com/laptop.jpg' },
  { name: 'Mouse Wireless', description: 'RGB, 16000 DPI', price: 249.99, stock: 50 },
  { name: 'Tastatură Mecanică', description: 'Switch-uri Cherry MX Red', price: 499.99, stock: 30 },
  { name: 'Monitor 27" 144Hz', description: 'IPS, Full HD', price: 1299.99, stock: 15 },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }
  console.log('Product seed done – 4 produse adăugate');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
