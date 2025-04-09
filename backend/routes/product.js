import express from 'express';
const router = express.Router();
import { getProducts, addProduct } from '../controllers/productsController.js';

router.get('', getProducts);
console.log('✅ Registered POST /add route');
router.post('/add', addProduct);
console.log('✅ productRoutes loaded');

router.use((req, res, next) => {
    console.log(`[ROUTER] ${req.method} ${req.originalUrl}`);
    next();
  });
  
export default router;
