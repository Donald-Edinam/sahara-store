import React from 'react'
import ProductHeader from '../../components/home/ProductHeader'
import ProductCard from '../../components/common/ProductCard'
import SecondCategoryCard from '../../components/common/SecondCategoryCard'


// Dummy data
const dummyData = [1, 2, 3]

const ProductCategory = () => {
    return (
        <div className='min-h-[100vh]'>
            <ProductHeader heading={"top category"} description={"Explore Categories"} />
            <div className="flex items-center mt-10 justify-around">
                {
                    dummyData.map((data) => (
                        <ProductCard />
                    ))
                }
            </div>
            <div className="flex items-center mt-10 justify-center gap-5">
                {
                    dummyData.slice(0, 2).map((data) => (
                        <SecondCategoryCard />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductCategory
