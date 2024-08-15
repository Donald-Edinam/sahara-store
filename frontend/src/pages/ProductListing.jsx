import React from 'react'
import ProductHeader from '../components/home/ProductHeader'
import MainProductCard from '../components/common/MainProductCard'

const ProductListing = () => {

  const dummyData = [1, 2, 3]

  return (
    <section className='min-h-[100vh]'>
      <ProductHeader heading='trending' description='Top Products' />
      <div className="flex items-center mt-10 justify-around">
        {
          dummyData.map((item) => (
            <MainProductCard />
          ))
        }
      </div>
    </section>
  )
}

export default ProductListing
