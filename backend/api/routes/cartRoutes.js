import express from 'express'; 
import CartContoller from '../controllers/cartController.js'; 
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get('/cart', authenticateToken, authorizeRole, CartContoller.getCart);
cartRouter.post('/carts', authenticateToken, authorizeRole, CartContoller.addToCart); // Handles Adding and updating cart
cartRouter.delete('/carts/:productId', authenticateToken, authorizeRole, CartContoller.removeFromCart);
cartRouter.delete('/carts', authenticateToken, authorizeRole, CartContoller.clearCart); // Clears the whole cart. should be used carefully

export default cartRouter;