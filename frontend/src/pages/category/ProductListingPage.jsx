import React, { useContext } from 'react';
import { CategoryContext } from '../../context/CategoryContext';
import { Link } from 'react-router-dom';

const ProductListingPage = () => {

  const { categories, loading, error, products, fetchProductsByCategory, selectedCategory } = useContext(CategoryContext);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer p-2 rounded hover:bg-base ${selectedCategory === category.id ? 'bg-secondary text-primary' : ''}`}
                onClick={() => fetchProductsByCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {selectedCategory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-2">${product.price}</p>
                    <p className="text-sm text-gray-500">{product.description.substring(0, 50)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Select a category to view products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;