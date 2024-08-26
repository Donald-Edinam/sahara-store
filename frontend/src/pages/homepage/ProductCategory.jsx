import React from 'react';
import ProductHeader from '../../components/home/ProductHeader';
import ProductCard from '../../components/common/ProductCard';
import SecondCategoryCard from '../../components/common/SecondCategoryCard';
import { Link } from "react-router-dom"

const ProductCategory = () => {

    // Dummy data
    const firstProductCategory = [
        {
            id: "1",
            name: "Arts and Design",
            image: "https://i.pinimg.com/564x/3d/95/3b/3d953bcbcdcde0790c2fb93882c77d17.jpg",
        },
        {
            id: "2",
            name: "Beauty and Skincare",
            image: "https://i.pinimg.com/736x/cd/83/65/cd8365cab4c267626d4d5d12b4a63eaf.jpg",
        },
        {
            id: "3",
            name: "African Cuisines",
            image: "https://i.pinimg.com/564x/f0/10/05/f01005d89ecdf34f1b44092d6cfcd0ac.jpg",
        }
    ];

    const secondProductCategory = [
        {
            id: "1",
            name: "Clothing Casuals",
            description: "Explore the elegant African print in perfect convenience",
            image: "https://i.pinimg.com/564x/bd/df/03/bddf03a44de92055d37808884556cb6b.jpg",
        },
        {
            id: "2",
            name: "Handcrafted Jewelry",
            description: "Craft yur body with the best of African jewelries in your own style",
            image: "https://i.pinimg.com/564x/19/43/72/1943728808dbf2131e4d668ef0102332.jpg",
        },
    ]



    return (
        <div className='min-h-[100vh]' id='categories'>
            <ProductHeader heading={"Top Category"} description={"Explore Categories"} />

            {/* Responsive flexbox for ProductCard */}
            <div className="flex flex-wrap items-center mt-10 justify-around gap-5 m-4">
                {firstProductCategory.map((data, index) => (
                    <Link to="/products" className="bg-red-400"  key={index}>
                        <ProductCard data={data} className="flex-1 min-w-[250px] max-w-[300px]" />
                    </Link>
                ))}
            </div>

            {/* Responsive flexbox for SecondCategoryCard */}
            <div className="flex flex-wrap items-center mt-10 justify-center gap-5">
                {secondProductCategory.map((data, index) => (
                    <Link to={"product-listing"} key={index}>
                        <SecondCategoryCard data={data} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductCategory;
