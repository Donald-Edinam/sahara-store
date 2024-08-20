// import axios from "axios";

// const URL = "https://api.escuelajs.co/api/v1/categories"

// const fetchCategories = async () => {
//     setLoading(true);
//     try {
//         const response = await axios.get(URL);
//         return response.data
//     } catch (err) {
//         setError(err.response?.data?.message || 'Error fetching categories');
//     } finally {
//         setLoading(false);
//     }
// };

// const fetchProductsByCategory = async (categoryId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
//      categoryId();
//     } catch (err) {
//       setError('Failed to fetch products');
//       setLoading(false);
//     }
//   };


// export { fetchCategories,  }