import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'product-service', db: 'PostgreSQL' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`product-service running on port ${PORT}`);
});
