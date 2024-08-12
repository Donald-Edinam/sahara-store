import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

/* export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        // Check if user already exists
        const existingUser = await userModel.model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}; */

/* export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.model.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'User logged in successfully',
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};
 */
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
