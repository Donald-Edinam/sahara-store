import React from 'react'
import Hero from '../components/layout/Hero'
import ProductCategory from './homepage/ProductCategory'
import ProductListing from './ProductListing'
import FeaturedCarousel from '../components/home/FeaturedCarousel'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <ProductCategory />
      <ProductListing />
      <FeaturedCarousel />
      <Footer />
    </div>
  )
}

export default Home
