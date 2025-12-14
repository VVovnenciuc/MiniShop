import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import orderRoutes from './routes/order.routes.js';
import { protect } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'order-service', db: 'PostgreSQL' });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`order-service running on port ${PORT}`);
});