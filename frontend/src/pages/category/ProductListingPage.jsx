import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { handleAddToCart } from '../../components/common/MainProductCard';
import Button from '../../components/common/Button';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../context/CartProvider';
import { AuthContext } from '../../context/AuthProvider';

const ProductListingPage = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { userState } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const fetchedProducts = products?.data;

  useEffect(() => {
    if (fetchedProducts && fetchedProducts.length > 0) {
      const uniqueCategories = [...new Set(fetchedProducts.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [fetchedProducts]);

  const filteredProducts = selectedCategory
    ? fetchedProducts.filter(product => product.category === selectedCategory)
    : fetchedProducts;

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  console.log("Categories", fetchedProducts)

  const handleAddToShopping = async (productId, quantity) => {
    setIsAdding(true);

    if (!userState) {
      toast.error("Login to add items to cart");
      setIsAdding(false);
    } else {
      try {
        await addToCart(productId, quantity);
        toast.success("Added to cart successfully");
      } catch (error) {
        console.error("Error", error);
        toast.error("Error adding to Cart");
      } finally {
        setIsAdding(false);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      {/* <h1 className="text-3xl font-bold mb-6">Product Categories</h1> */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 md:fixed mb-6 md:mb-0 md:pr-4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 md:w-40 rounded hover:bg-base ${selectedCategory === category ? 'bg-secondary text-primary' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4 md:absolute md:right-0">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
               <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[400px]">
               <div className="h-48 overflow-hidden">
                 <Link key={product._id} to={`product/${product._id}`}>
                   <img
                     className="w-full h-full object-cover"
                     src={product.imageUrl}
                     alt={product.name}
                   />
                 </Link>
               </div>
               <div className="p-4 flex-grow">
                 <Link key={product._id} to={`product/${product._id}`}>
                   <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                   <p className="text-gray-600 mb-2">${product.price}</p>
                   <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
                 </Link>
               </div>
               <div className="p-4">
                 <Button onClick={() => handleAddToShopping(product._id, 1)} className='w-full bg-secondary text-primary'>
                   Add to Cart
                 </Button>
               </div>
             </div>
              ))}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;