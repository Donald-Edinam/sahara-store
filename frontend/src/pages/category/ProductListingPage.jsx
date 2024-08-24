import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const ProductListingPage = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 rounded hover:bg-base ${selectedCategory === category ? 'bg-secondary text-primary' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product._id} to={`product/${product._id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-2">${product.price}</p>
                      <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
                    </div>
                  </div>
                </Link>
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