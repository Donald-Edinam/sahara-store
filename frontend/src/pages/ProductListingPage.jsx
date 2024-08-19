import React from 'react'
import CatergoryListingMenu from '../components/product/CatergoryListingMenu'
import ProductCategoryListing from '../components/product/ProductCategoryListing'

const ProductListingPage = () => {
  return (
    <section className='w-screen flex justify-between'>
      <CatergoryListingMenu />
      <ProductCategoryListing />
    </section>
  )
}

export default ProductListingPage
