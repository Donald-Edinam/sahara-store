import React from 'react';
import ProductHeader from '../../components/home/ProductHeader';
import ProductCard from '../../components/common/ProductCard';
import SecondCategoryCard from '../../components/common/SecondCategoryCard';

// Dummy data
const dummyData = [1, 2, 3];

const ProductCategory = () => {
    return (
        <div className='min-h-[100vh]'>
            <ProductHeader heading={"Top Category"} description={"Explore Categories"} />
            
            {/* Responsive flexbox for ProductCard */}
            <div className="flex flex-wrap items-center mt-10 justify-around gap-5 m-4">
                {dummyData.map((data, index) => (
                    <ProductCard key={index} className="flex-1 min-w-[250px] max-w-[300px]" />
                ))}
            </div>
            
            {/* Responsive flexbox for SecondCategoryCard */}
            <div className="flex flex-wrap items-center mt-10 justify-center gap-5">
                {dummyData.slice(0, 2).map((data, index) => (
                    <SecondCategoryCard key={index} className="flex-1 min-w-[250px] max-w-[300px]" />
                ))}
            </div>
        </div>
    );
};

export default ProductCategory;
