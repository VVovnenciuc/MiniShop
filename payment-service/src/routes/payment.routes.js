import express from 'express';
import { createPayment, getPaymentById } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createPayment);
router.get('/:id', protect, getPaymentById);

export default router;