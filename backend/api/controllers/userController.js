import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming you have a middleware to extract the userId from JWT

        const user = await userModel.model.findById(userId).populate('order_history');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User profile retrieved successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                orderHistory: user.order_history
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
};
