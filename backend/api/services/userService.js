import UserModel from '../models/userModel.js';

const userModel = new UserModel();

class UserService {
    static async getUserByEmail(email) {
        return await userModel.getUserByEmail(email);
    }

    static async createUser(data) {
        const { name, email, phone, hashedPasswd, role } = data;
        const password = hashedPasswd;
        
        if (!email) {
            throw new Error('Email is required');
        }

        if(!password) {
            throw new Error('Password is required');
        }

        if (!phone) {
            throw new Error('Phone is required');
        }

        const user  = await userModel.create({ name, email, phone, password, role }); 
        return user;
    }
}

export default UserService;
export { userModel };