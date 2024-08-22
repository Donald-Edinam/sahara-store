import React, { useContext, useState } from 'react';
import ProductHeader from './ProductHeader';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const FeaturedCarousel = () => {
  const { products, loading } = useContext(ProductContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchedProducts = products?.data
  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  const handlePrevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide(currentSlide === products.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <section className="min-h-[85vh] p-5 flex flex-col items-center">
      <ProductHeader heading="african inspired" description="Design Elements" />
      <div className="carousel w-full max-w-[800px] mt-10 py-5 rounded-md shadow-lg overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {fetchedProducts.map((product) => (
            <div key={product._id} className="min-w-full flex-shrink-0">
              <Link 
                to={`/product/${product._id}`}
                className="block w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  // src={product?.images[0]}
                  src={product}
                  className="w-full h-[550px] object-cover rounded-lg"
                  alt={`Product ${product.id}`}
                />
              </Link>
            </div>
          ))}
        </div>
        <button 
          onClick={handlePrevSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle bg-white text-black border-none shadow-md z-20"
        >
          ❮
        </button>
        <button 
          onClick={handleNextSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle bg-white text-black border-none shadow-md z-20"
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default FeaturedCarousel