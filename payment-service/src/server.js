import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import paymentRoutes from './routes/payment.routes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/payments', paymentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'payment-service', db: 'PostgreSQL' });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`payment-service running on port ${PORT}`);
});