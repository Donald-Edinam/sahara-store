import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../components/layout/Header';
import Home from '../pages/Home';
import ProductListingPage from '../pages/category/ProductListingPage';
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/cart/CartPage';

const Navigation = () => {
    return (
        <Router>
            <div data-theme="afrimart">
                <Header />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/cart' element={<CartPage />}/>
                  <Route path='/products' element={<ProductListingPage />}/>
                  <Route path='/product/:id' element={<ProductDetails />}/>
                  <Route path='/products/product/:id' element={<ProductDetails />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default Navigation