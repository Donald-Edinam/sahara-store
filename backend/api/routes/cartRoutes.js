import express from 'express'; 
import CartContoller from '../controllers/cartController.js'; 
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.get('/carts', authenticateToken, authorizeRole, CartContoller.getCart);
cartRouter.post('/carts', authenticateToken, authorizeRole, CartContoller.addToCart);
cartRouter.get('cart/:id', CartContoller.;


export default cartRouter;