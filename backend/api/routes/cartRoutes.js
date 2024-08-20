import express from 'express'; 
import CartContoller from '../controllers/cartController.js'; 
import { authenticateToken, authorizeRole, optionalAuthenticateToken } from '../../auth/middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get('/cart', optionalAuthenticateToken, authorizeRole, CartContoller.getCart);
cartRouter.post('/carts', optionalAuthenticateToken, authorizeRole, CartContoller.addToCart); // Handles Adding and updating cart
cartRouter.delete('/carts/:productId', optionalAuthenticateToken, authorizeRole, CartContoller.removeFromCart);
cartRouter.delete('/carts', optionalAuthenticateToken, authorizeRole, CartContoller.clearCart); // Clears the whole cart. should be used carefully
cartRouter.post('/carts', optionalAuthenticateToken, authorizeRole, CartContoller.addToCart);
cartRouter.get('cart/:id', CartContoller.getCart);

export default cartRouter;