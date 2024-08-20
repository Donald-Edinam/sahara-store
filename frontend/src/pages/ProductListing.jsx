import React, { useContext } from 'react';
import ProductHeader from '../components/home/ProductHeader';
import MainProductCard from '../components/common/MainProductCard';

import { ProductContext } from '../context/ProductContext'

const ProductListing = () => {

  const { products } = useContext(ProductContext);
  // console.log("products" , products) 
    const listedProducts = products.slice(10,13)

  return (
    <section className="min-h-[100vh] p-4">
      <ProductHeader heading="trending" description="Top Products" />
      <div className="flex flex-wrap items-center mt-10 justify-center gap-6">
        {listedProducts.map((product, index) => (
          <MainProductCard key={index} product={product}/>
        ))}
      </div>
    </section>
  );
};

export default ProductListing;
