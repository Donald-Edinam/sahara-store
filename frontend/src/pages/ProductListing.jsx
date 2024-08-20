import React, { useContext } from 'react';
import ProductHeader from '../components/home/ProductHeader';
import MainProductCard from '../components/common/MainProductCard';

import { ProductContext } from '../context/ProductContext';

const ProductListing = () => {

  const { products } = useContext(ProductContext);
  const listedProducts = products?.data || [];
  const mainProducts = listedProducts.slice(0, 3); // Use slice instead of substring

  return (
    <section className="min-h-[100vh] p-4">
      <ProductHeader heading="trending" description="Top Products" />
      <div className="flex flex-wrap items-center mt-10 justify-center gap-6">
        {mainProducts.map((product,) => (
          <MainProductCard key={product._id} product={product}/>
        ))}
      </div>
    </section>
  );
};

export default ProductListing;
