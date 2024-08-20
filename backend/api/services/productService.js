import ProductModel from '../models/productModel.js';

const productModel = new ProductModel();

class productService {
    static async getAllProducts() {
        try {
            const products = await productModel.findAll();
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getProductById(productId) {
        const product = await productModel.findById(productId);
        return product;
    }

    static async createProduct(productData) {
        const { name, price, description, category, stock} = productData;
        if (!name || !price || !description || !category || !stock) {
            throw new Error('All fields are required');
        }

        let product;
        try {
            product = await productModel.create(productData);
        } catch (error) {
            throw new Error(error.message);
        }
        return product;
    }

    static async updateProduct(productId, updateData) {
        if (!productId) {
            throw new Error('Product ID is required');
        }

        if (!updateData || Object.keys(updateData).length < 1) {
            throw new Error('Update data is required');
        }

        let updatedProduct;
        try {
            updatedProduct = await productModel.update(productId, updateData);
        } catch (error) {
            throw new Error(error.message);
        }

        if (stock in updatedData && updatedProduct.stock < 1) {
            CartService.cascadeDeleteProduct(productId);
        }

        return updatedProduct;
    }

    static async deleteProduct(productId) {
        const deletedProduct = await productModel.deleteById(productId);
        return deletedProduct;
    }
}

export default productService;
export { productModel }