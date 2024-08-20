import React, { useContext, useState } from 'react';
import ProductHeader from './ProductHeader';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const FeaturedCarousel = () => {
  const { products } = useContext(ProductContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = products;

  const handlePrevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide(currentSlide === 0 ? featuredProducts.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide(currentSlide === featuredProducts.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <section className="min-h-[85vh] p-5 flex flex-col items-center">
      <ProductHeader heading="african inspired" description="Design Elements" />
      <div className="carousel w-full max-w-[800px] mt-10 py-5 rounded-md shadow-lg overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-full flex-shrink-0">
              <Link 
                to={`/product/${product.id}`}
                className="block w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={product.images[0]}
                  className="w-full h-[550px] object-cover rounded-lg"
                  alt={`Product ${product.id}`}
                />
              </Link>
            </div>
          ))} */}1
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

export default FeaturedCarousel;