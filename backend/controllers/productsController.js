import { ProductDTO } from '../DTOs/productDTO.js';
import { getAllProducts, createProduct } from '../repositories/product-repo.js';

export const getProducts = async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
};

export const addProduct = async (req, res) => {
    console.log('📦 addProduct controller called');
    console.log('📦 Request body:', req.body);
  
    try {
      const newProduct = await createProduct(req.body.name);
      console.log('✅ Product created:', newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('❌ Error in addProduct:', error.message);
      res.status(500).json({ error: 'Failed to add product' });
    }
  };
  