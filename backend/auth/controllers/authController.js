import authService from '../services/authService.js';

class AuthController {
    static async register(req, res) {
        try {
            const { name, email, phone, password, role } = req.body;
            let result;
            try {
                result = await authService.registerUser({ name, email, phone, password, role });
            } catch (error) {
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
            const { user, token } = await authService.loginUser(req.body.email, req.body.password);
            res.status(200).json({
                message: 'User logged in successfully',
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                token
            });
            res.end();
        } catch (error) {
            res.status(500).json({ message: 'Error logging in user', error: error.message });
            res.end();
        }
    }
}

export default AuthController;