import UserService from '../../api/services/userService.js';  // Import the user service
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthService {
    async registerUser(data) {
        const { name, email, phone, password, role } = data;
        const existingUser = await UserService.getUserByEmail(email);  // Check if user already exists
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPasswd = await this.hashPassword(password); // Hash the password
        let newUser;
        try {
            newUser = await UserService.createUser({ name, email, phone, hashedPasswd, role }); // Create new user
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
       const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token 
       return { user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }, token }; // Return user and token data
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt); // Hash the password
    }

    /* async loginUser(email, password) {
        return await UserService.loginUser(email, password); // Use user service for login
    } */
}

export default new AuthService();
