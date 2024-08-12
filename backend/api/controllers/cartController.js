import cartService from '../services/cartService';

export const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCartByUserId(req.user.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const updatedCart = await cartService.addToCart(req.user.id, req.body);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const updatedCart = await cartService.updateCartItem(req.user.id, req.params.productId, req.body.quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const updatedCart = await cartService.removeFromCart(req.user.id, req.params.productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
