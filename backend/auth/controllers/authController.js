import authService from '../services/authService.js';
import cartService from '../../api/services/cartService.js';
import mongoose from 'mongoose';

class AuthController {
    static async register(req, res) {
        try {
            const { name, email, phone, password, role } = req.body;
            let result;
            try {
                result = await authService.registerUser({ name, email, phone, password, role });
            } catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error registering user', error: error.message});
                res.end();
                return;
            }
            
            res.status(201).json({
                message: 'User registered successfully',
                user: result.user,
                token: result.token
            });
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Errorb registering user', error: error.message });
            res.end();
            return;
        }
    }

    static async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                res.end();
                return;
            }

            const { user, token } = await authService.loginUser(email, password);

            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                res.end();
                return;
            }

            if (req.session.cart) {
                req.session.cart.forEach(async product => {
                    try {
                        await cartService.addProductToCart(user.id, product);
                    } catch (error) {
                        console.log(error);
                    }
                });
            }

            res.status(200).json({
                message: 'User logged in successfully',
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                token
            });

            res.end();
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error logging in user', error: error.message });
            res.end();
        }
    }
}

export default AuthController;