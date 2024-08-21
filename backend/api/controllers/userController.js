import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/userService.js';

const userModel = new UserModel();


class UserContoller {
    static async getUser(req, res) {
        try {
            const user = await UserService.getUserByEmail(req.params.email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
}