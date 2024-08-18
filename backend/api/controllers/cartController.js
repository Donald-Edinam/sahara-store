import cartService from '../services/cartService.js';

class CartController {
    static async getCart(req, res) {
        /* res.json({ message: 'Get cart' }); */
        try {
            let cart;
            if (req.user) {
                 cart = await cartService.getCartByUserId(req.user.userId);
            } else {
                 cart = req.session.cart || [];
            }
            res.json(cart);
        } catch (error) {
            console.log(error);
            res.status(500).json({ messages: error.message });
        }
    }

    static async addToCart(req, res) {
        try {
            if (req.user) {
                const updatedCart = await cartService.addProductToCart(req.user.userId, req.body);
                res.json(updatedCart);
                res.end();
            } else {
                if (!req.session.cart) {
                    req.session.cart = [];
                }

                const productIndex = req.session.cart.findIndex(product => product.productId === productId);
                if (productIndex === -1) {
                    req.session.cart.push(req.body);
                } else {
                    req.session.cart[productIndex].quantity += quantity;
                }

                res.json(req.session.cart);
                res.end();
            }
           
        } catch (error) {
            console.log(error);
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