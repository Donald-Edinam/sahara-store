import CartModel from "../models/cartModel.js";


class CartService {
    async getCartByUserId(id) {
        // Get cart from the database
        if (!id) {
            throw new Error('User ID is required');
        }

        cartModel = new CartModel();

        // Get the cart from the database
        try {
            const cart = await cartModel.findOne({ userId: id }).populate('products.productId');
            if (!cart) {
                throw new Error('Cart not found');
            }

            const totals = await this.calculateCartTotals(cart.products);
            [cart.totalPrice, cart.quantity] = totals;
            return cart;   
        } catch (error) {
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }

    async calculateCartTotals(products) {
        // Calculate the total price and quantity of products in the cart
        let total = 0;
        let quantity = 0;

        products.forEach(product => {
            total += product.productId.price * product.quantity;
            quantity += product.quantity;
        });

        return { total, quantity };
    }
}

export default CartService;