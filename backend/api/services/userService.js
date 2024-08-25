import UserModel from '../models/userModel.js';
import cartService from './cartService.js';
import orderService from './orderService.js';


const userModel = new UserModel();

class UserService {
    static async getUserProfile(id) {
        if (!id) {
            throw new Error('User id is required');
        }

        const user = await userModel.findById(id);
        if (!user) {
            return { status: 404, response: 'User not found' };
        }

        const userOrders = await orderService.getOrders(id);
        const userCart = await cartService.getCartByUserId(id);

        const userResponseData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            cart: userCart.products,
            orders: userOrders
        };

        return { status: 200, response: userResponseData };
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