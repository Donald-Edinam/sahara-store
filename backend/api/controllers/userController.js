import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/userService.js';

class UserController {
    static async getUserProfile(req, res) {
        try {
            const { status, response } = await UserService.getUserProfile(req.user.userId);
            if (status !== 200) {
                return res.status(status).json({ message: response });
            }

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
    }
}

export default UserController;