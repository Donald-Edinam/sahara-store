import UserService, { userModel } from '../../api/services/userService.js';  // Import the user service
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
       console.log(newUser)
       return { user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }, token }; // Return user and token data
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt); // Hash the password
    }

    async loginUser(email, password) {
        if (!email) {
            throw new Error('Email is needed to login');
        }

        if (!password) {
            throw new Error('Password is needed to login');
        }
       const user = await userModel.getUserByEmail(email);
       console.log(user);
       if (!user) {
        throw new Error("User with Email does not exist")
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
        throw new Error('Incorrect Password Provided');
       }

       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token 
       return {user: {id: user._id, name: user.name, email: user.email, role: user.role }, token }; // Return user and token data}}
    }
}

export default new AuthService();
