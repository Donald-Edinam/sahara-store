import ProductModel from '../models/productModel.js';
import cartService from './cartService.js';

const productModel = new ProductModel();

class productService {
    static async getAllProducts() {
        try {
            const products = await productModel.findAll();
            return products.filter(product => product.stock > 0);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getProductById(productId) {
        try {
            const product = await productModel.findById(productId);
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
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

        if ("stock" in updateData && updatedProduct.stock < 1) {
            await cartService.cascadeDeleteProduct(productId);
        }

        return updatedProduct;
    }

    static async deleteProduct(productId) {
        try {
            const deletedProduct = await productModel.delete(productId);
            await cartService.cascadeDeleteProduct(productId);
            return deletedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getProductsByCategory(searchQuery) {
        try {
            const products = await productModel.find({ category: searchQuery });
            return products.filter(product => product.stock > 0);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default productService;
export { productModel }