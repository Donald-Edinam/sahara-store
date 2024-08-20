import cartService from '../services/cartService.js';

class CartController {
    static async getCart(req, res) {
        /* res.json({ message: 'Get cart' }); */
        try {
            let cart;
            if (req.user) {
                console.log(req.user);
                 cart = await cartService.getCartByUserId(req.user.userId);
            } else {
                 cart = req.session.cart || [];
            }
            res.json(cart);
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({ messages: error.message });
        }
    }

    static async addToCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            if (req.user) {
                const updatedCart = await cartService.addProductToCart(req.user.userId, { productId, quantity });
                res.json(updatedCart);
            } else {
                if (!req.session.cart) {
                    req.session.cart = [];
                }

                console.log({ productId, quantity });
                const productIndex = req.session.cart.findIndex(product => product.productId === productId);
                if (productIndex === -1) {
                    req.session.cart.push({ productId, quantity: parseInt(quantity) });
                } else {
                    req.session.cart[productIndex].quantity += quantity;
                }

                res.json(req.session.cart);
            }     
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

   static async removeFromCart(req, res) {
        try {
            let updatedCart;
            if (req.user) {
                updatedCart = await cartService.removeFromCart(req.user.userId, req.params.productId);
            } else {
                if (!req.session.cart) {
                    req.session.cart = [];
                }

                const productIndex = req.session.cart.findIndex(product => product.productId === productId);
                if (productIndex !== -1) {
                    req.session.cart.splice(productIndex, 1);
                }
                updatedCart = req.session.cart;
            }
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async clearCart(req, res) {
        try {
            let updatedCart;
            if (req.user) {
                updatedCart = await cartService.removeAllProducts(req.user.userId);
            } else {
                req.session.cart = [];
                updatedCart = req.session.cart;
            }
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default CartController;