import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartButton from '../common/CartButton';
import { AuthContext } from '../../context/AuthProvider';
import LogoMain from '../../assets/Logo_main.png';
import { CartContext } from '../../context/CartProvider';

const Header = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const { userState, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { cart } = useContext(CartContext);

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    console.log("Cart", cart);

    return (
        <>
            <header className="bg-base-100 fixed w-screen top-0 z-10">
                <div className="navbar flex justify-around items-center p-2 w-full">

                    {/* Logo and Hamburger Menu for Mobile */}
                    <div className="flex items-center justify-between sm:w-1/2">
                        <Link to="/" className="w-1/3">
                            <img
                                className=''
                                src={LogoMain}
                                alt="Sahara Store's Logo" />
                        </Link>
                        <div className="sm:hidden flex items-center justify-center">
                            <button onClick={toggleSidenav} className="btn btn-ghost text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                            <a href={"/cart"}>
                                <CartButton cart={cart} />
                            </a>
                        </div>
                    </div>

                    {/* Desktop Search Form */}
                    <div className="hidden sm:block sm:w-auto">
                        {/* <SearchForm /> */}
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className="hidden sm:flex no-wrap items-center">
                        <ul className="menu menu-horizontal flex-nowrap px-1 gap-4">
                            <li>
                                <details>
                                    <summary className='cursor-pointer mt-3'>
                                        {userState ? `Account (${userState.name})` : 'Account'}
                                    </summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        {!userState ? (
                                            <>
                                                <li><Link to="/login">Login</Link></li>
                                                <li><Link to="/signup">Sign Up</Link></li>
                                            </>
                                        ) : (
                                            <>
                                                <li><button onClick={handleLogout}>Logout</button></li>
                                            </>
                                        )}
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <a href="/cart">
                                    <CartButton cart={cart} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* Sidenav for Mobile */}
            <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transform ${isSidenavOpen ? 'translate-x-[0]' : '-translate-x-[-100%]'} transition-transform ease-in-out duration-300 sm:hidden`}>
                <div className="bg-base-100 w-full h-full shadow-lg">
                    <button onClick={toggleSidenav} className="btn btn-ghost text-xl m-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="p-4">
                        {/* <SearchForm /> Search form inside the sidenav */}
                    </div>
                    <ul className="menu p-4">
                        {!userState ? (
                            <>
                                <li><Link to="/login" className="block px-4 py-2">Login</Link></li>
                                <li><Link to="/signup" className="block px-4 py-2">Sign Up</Link></li>
                            </>
                        ) : (
                            <li><button onClick={handleLogout} className="block px-4 py-2">Logout</button></li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;