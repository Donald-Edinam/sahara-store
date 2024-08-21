import express from 'express'; 
import UserContoller from '../controllers/cartController.js'; 

const userRouter = express.Router();

userRouter.post('/users', UserContoller.getCart);
userRouter.get('/users/:id', UserContoller.getUser);


export default userRouter;