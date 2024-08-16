import React, { useState } from 'react';
import ProductHeader from './ProductHeader';

const FeaturedCarousel = () => {
  const slides = [
    { id: 1, image: "https://dummyimage.com/600x400/333/fff&text=Product+1" },
    { id: 2, image: "https://dummyimage.com/600x400/333/fff&text=Product+2" },
    { id: 3, image: "https://dummyimage.com/600x400/333/fff&text=Product+3" },
    { id: 4, image: "https://dummyimage.com/600x400/333/fff&text=Product+4" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <section className="min-h-[85vh] p-5 flex flex-col items-center">
      <ProductHeader heading="african inspired" description="Design Elements" />
      <div className="carousel w-full max-w-[800px] mt-10 py-5 rounded-md shadow-lg overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full flex-shrink-0">
              <img
                src={slide.image}
                className="w-full h-full object-cover rounded-lg"
                alt={`Slide ${slide.id}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button onClick={handlePrevSlide} className="btn btn-circle bg-white text-black border-none shadow-md">❮</button>
          <button onClick={handleNextSlide} className="btn btn-circle bg-white text-black border-none shadow-md">❯</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
