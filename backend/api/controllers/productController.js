import productService from '../services/productService.js';


class ProductController {
    static async getAllProducts (req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getProductById (req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createProduct (req, res) {
        const { name, price, description, category, stock, imageURL, tag } = req.body;
        try {
            const newProduct = await productService.createProduct({ name, price, description, category, stock, imageURL, tag });
            res.status(201).json(newProduct);
            res.end();
        } catch (error) {
            res.status(500).json({ error: 'Error creating Product', message: error.message });
            res.end();
        }
    }

    static async updateProduct (req, res) {
        try {
            const updatedProduct = await productService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteProduct (req, res) {
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ProductController;