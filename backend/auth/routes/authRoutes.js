import express from 'express'; 
import AuthContoller from '../controllers/authController.js'; 

const authRouter = express.Router();

authRouter.post('/register', AuthContoller.register);


export default authRouter;