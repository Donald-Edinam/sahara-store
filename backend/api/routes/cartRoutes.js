import express from 'express'; 
import CartContoller from '../controllers/cartController.js'; 

const cartRouter = express.Router();

cartRouter.get('/carts', CartContoller.getCart);


export default cartRouter;