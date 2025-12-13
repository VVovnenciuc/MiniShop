import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAll);           // public
router.get('/:id', getById);       // public

router.post('/', protect, create);         // doar autentificat
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

export default router;
