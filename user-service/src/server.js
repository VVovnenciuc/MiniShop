import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Atașăm prisma la request ca să-l folosim în controllere
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/users', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service', db: 'PostgreSQL' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`user-service running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});
