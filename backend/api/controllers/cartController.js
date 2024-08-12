import CartService from '../services/cartService.js';

const cartService = new CartService();


class CartController {
    static async getCart(req, res) {
        /* res.json({ message: 'Get cart' }); */
        try {
            const cart = await cartService.getCartByUserId(req.user.id);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addToCart(req, res) {
        try {
            const updatedCart = await cartService.addToCart(req.user.id, req.body);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateCartItem(req, res) {
        try {
            const updatedCart = await cartService.updateCartItem(req.user.id, req.params.productId, req.body.quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

   static async removeFromCart(req, res) {
        try {
            const updatedCart = await cartService.removeFromCart(req.user.id, req.params.productId);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default CartController;