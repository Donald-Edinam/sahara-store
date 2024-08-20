import express from 'express';
import ProductController from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const productRouter = express.Router();

// Defining the routes
productRouter.post('/products', authenticateToken, authorizeRole, ProductController.createProduct);
productRouter.get('/products', ProductController.getAllProducts);
productRouter.get('product/:id', ProductController.getProductById);
productRouter.put('product/:id', authenticateToken, authorizeRole, ProductController.updateProduct);
productRouter.delete('product/:id', ProductController.deleteProduct);

export default productRouter;