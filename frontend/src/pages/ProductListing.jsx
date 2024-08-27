import React, { useContext } from 'react';
import ProductHeader from '../components/home/ProductHeader';
import MainProductCard from '../components/common/MainProductCard';
import { productImg } from '../../productImg';
import { ProductContext } from '../context/ProductContext';

const ProductListing = () => {
  const { products } = useContext(ProductContext);
  const listedProducts = products?.data || [];
  const mainProducts = listedProducts.slice(0, 3);

  // Function to find the best matching image
  const findBestImageMatch = (productName) => {
    const key = Object.keys(productImg).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    return key ? productImg[key] : ''; // Return the URL if found, or an empty string
  };

  return (
    <section className="min-h-[100vh] p-4">
      <ProductHeader heading="trending" description="Top Products" />
      <div className="flex flex-wrap items-center mt-10 justify-center gap-6">
        {mainProducts.map((product) => (
          <MainProductCard 
            key={product._id} 
            product={product} 
            image={findBestImageMatch(product.name)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductListing;