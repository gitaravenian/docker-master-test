import express from 'express';
const router = express.Router();
import { getProducts, addProduct } from '../controllers/productsController.js';

router.get('', getProducts);
router.post('/add', addProduct);
console.log('✅ productRoutes loaded');

export default router;
