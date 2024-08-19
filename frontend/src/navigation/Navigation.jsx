import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../components/layout/Header';
import Home from '../pages/Home';
import ProductListingPage from '../pages/ProductListingPage';

const Navigation = () => {
    return (
        <Router>
            <div data-theme="afrimart">
                <Header />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/product-listing' element={<ProductListingPage />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default Navigation