import axios from 'axios';

const PRODUCT_URL = 'https://api.escuelajs.co/api/v1/products';

const fetchProducts = async () => {
    try {
        const response = await axios.get(PRODUCT_URL);
        const products = response.data
        return products
    } catch (error) {
        throw new Error('Error fetching data: ', error.message);
    }
}

export default fetchProducts;