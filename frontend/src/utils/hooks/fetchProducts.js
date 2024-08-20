import axios from 'axios';
import { API_ROUTE } from '../../services/axiosConfig';

const PRODUCT_URL = 'https://api.escuelajs.co/api/v1/products';


const fetchProducts = async () => {
    try {
        // const response = await axios.get(PRODUCT_URL);
        const response = await axios.get( `${API_ROUTE}/api/products`);
        const products = response.data
        return products
    } catch (error) {
        throw new Error('Error fetching data: ', error.message);
    }
}

export default fetchProducts;