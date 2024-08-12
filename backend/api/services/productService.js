import ProductModel from '../models/productModel';

class productService {

    async getAllProducts() {
        const products = await ProductModel.findAll();
        return products;
    }

    async getProductById(productId) {
        const product = await ProductModel.findById(productId);
        return product;
    }

    async createProduct(productData) {
        const product = await ProductModel.create(productData);
        return product;
    }

    async updateProduct(productId, updateData) {
        const updatedProduct = await ProductModel.updateById(productId, updateData);
        return updatedProduct;
    }

    async deleteProduct(productId) {
        const deletedProduct = await ProductModel.deleteById(productId);
        return deletedProduct;
    }
}

export default productService;
