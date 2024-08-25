import express from 'express'; 
import UserController from '../controllers/userController.js';
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/profile', authenticateToken, authorizeRole, UserController.getUserProfile);

export default userRouter;