import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartButton from '../common/CartButton';
import SearchForm from '../common/SearchForm';

const Header = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    return (
        <>
            <header className="bg-base-100 sticky top-0 z-10">
                <div className="navbar flex justify-between items-center p-4">
                    
                    {/* Logo and Hamburger Menu for Mobile */}
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <Link to="/" className="btn btn-ghost text-xl">AFRIMART</Link>
                        <div className="sm:hidden flex items-center">
                            <button onClick={toggleSidenav} className="btn btn-ghost text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                            <CartButton />
                        </div>
                    </div>

                    {/* Desktop Search Form */}
                    <div className="hidden sm:block sm:w-auto">
                        <SearchForm />
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className="hidden sm:flex items-center">
                        <ul className="menu menu-horizontal px-1 gap-4">
                            <li>
                                <details>
                                    <summary className='cursor-pointer'>Account</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/signup">Sign Up</Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <CartButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* Sidenav for Mobile */}
            <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transform ${isSidenavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300 sm:hidden`}>
                <div className="bg-base-100 w-100 h-full shadow-lg">
                    <button onClick={toggleSidenav} className="btn btn-ghost text-xl m-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="p-4">
                        <SearchForm /> {/* Search form inside the sidenav */}
                    </div>
                    <ul className="menu p-4">
                        <li><Link to="/login" className="block px-4 py-2">Login</Link></li>
                        <li><Link to="/signup" className="block px-4 py-2">Sign Up</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
