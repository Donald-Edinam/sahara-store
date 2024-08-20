import express from 'express'; 
import CartContoller from '../controllers/cartController.js'; 
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get('/cart', authenticateToken, authorizeRole, CartContoller.getCart);
cartRouter.post('/carts', authenticateToken, authorizeRole, CartContoller.addToCart);
cartRouter.get('cart/:id', CartContoller.getCart);


export default cartRouter;