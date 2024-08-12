import express from 'express'; 
import UserContoller from '../controllers/cartController.js'; 

const userRouter = express.Router();

userRouter.post('/users', UserContoller.getCart);


export default userRouter;