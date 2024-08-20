import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCategoryListing = ({ query }) => {
  const [products, setProducts] = useState([]);



  useEffect(() => {
    const getProducts = async () => {
      const category = query.category ? `?category=${query.category}` : '';
      const productData = (await axios.get(`https://api.escuelajs.co/api/v1/products${category}`)).data;
      console.log("Product data:", productData);
      setProducts(productData);
    };

    getProducts();
  }, [query]);

  return (
    <div className='container w-[77%] h-[90vh] bg-blue-400'>
      {products.length ? (
        products.map(product => (
          <div key={product.id} className="product-item">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {/* Add more product details */}
          </div>
        ))
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  );
};

export default ProductCategoryListing;
