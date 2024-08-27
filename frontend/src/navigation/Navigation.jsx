// Navigation.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from '../components/layout/Header';
import Home from '../pages/Home';
import ProductListingPage from '../pages/category/ProductListingPage';
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/cart/CartPage';
import SignUpPage from '../pages/auth/SignUpPage';
import LoginPage from '../pages/auth/LoginPage';
import PrivacyPolicy from '../pages/privacy-policy/PrivacyPolicy';
import Loader from '../components/common/Loader'; // Import your Loader component
import Cart from '../pages/cart/component/Cart';

const NotFound = () => {
    return (
        <div className="container flex flex-col justify-center items-center gap mx-auto mt-10 py-10">
            <h1 className='text-6xl text-center p-4 font-bold mt-10 font-serif'>Error 404</h1>
            <p className='text-lg'>PAGE NOT FOUND</p>
            <Link to={"/"} className='underline'>
                GO HOME
            </Link>
        </div>
    )
}

const Navigation = () => {
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            // Simulate a fetch or any async task
            // Replace this with actual data fetching if needed
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false); // Set loading to false once resources are loaded
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />; // Show loader if still loading
    }

    return (
        <Router>
            <div data-theme="afrimart">
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/*' element={<NotFound />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/products' element={<ProductListingPage />} />
                    <Route path='/product/:id' element={<ProductDetails />} />
                    <Route path='/products/product/:id' element={<ProductDetails />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                 </Routes>
            </div>
        </Router>
    )
}

export default Navigation;
