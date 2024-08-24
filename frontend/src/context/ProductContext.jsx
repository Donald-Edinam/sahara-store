import { createContext, useEffect, useState } from 'react';
// import fetchProducts from '../utils/hooks/fetchProducts';
import axios from 'axios';
import { API_ROUTE } from '../services/axiosConfig';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const retrieveProducts = async () => {
            try {
                setLoading(true);
                const newProducts = await axios.get(`${API_ROUTE}/api/products`); // Wait for the promise to resolve
                console.log("Fetched products:", newProducts); // Log the resolved data
                setProducts(newProducts); // Set the data to state
            } catch (err) {
                console.error("Error fetching products:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        retrieveProducts();
    }, []);
    

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};