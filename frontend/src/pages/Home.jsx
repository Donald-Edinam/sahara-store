import React from 'react'
import Hero from '../components/layout/Hero'
import ProductHeader from '../components/home/ProductHeader'
import ProductCategory from './homepage/ProductCategory'
import ProductListing from './ProductListing'

const Home = () => {
  return (
    <>
      <Hero />
      <ProductCategory />
      <ProductListing />
    </>
  )
}

export default Home
