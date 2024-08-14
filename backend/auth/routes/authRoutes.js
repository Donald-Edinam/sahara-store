import express from 'express'; 
import AuthContoller from '../controllers/authController.js'; 

const authRouter = express.Router();

authRouter.post('/register', AuthContoller.register);
authRouter.post('/login', AuthContoller.login);


export default authRouter;