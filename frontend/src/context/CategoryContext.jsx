// // CategoryContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//     const [categories, setCategories] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
//                 setCategories(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch categories');
//                 setLoading(false);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const fetchProductsByCategory = async (categoryId) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
//             setProducts(response.data);
//             setSelectedCategory(categoryId);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch products');
//             setLoading(false);
//         }
//     };

//     return (
//         <CategoryContext.Provider value={{ categories, loading, error, selectedCategory, products, fetchProductsByCategory }}>
//             {children}
//         </CategoryContext.Provider>
//     );
// };

// //export const useCategories = () => useContext(CategoryContext);