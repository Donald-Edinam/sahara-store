import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CartButton from '../common/CartButton'
import SearchForm from '../common/SearchForm'

const Header = () => {
    return (
        <header className="bg-base-100 sticky top-0 z-10">
            <div className="navbar flex-col sm:flex-row justify-between items-center p-4">
                <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
                    <a className="btn btn-ghost text-xl">AFRIMART</a>
                    <div className="sm:hidden">
                        <CartButton />
                    </div>
                </div>

                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                    <SearchForm />
                </div>

                <div className="hidden sm:flex items-center">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        <li>
                            <details>
                                <summary className='mt-1'>Account</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li><a>Login</a></li>
                                    <li><a>Sign Up</a></li>
                                </ul>
                            </details>
                        </li>
                        <li className="hidden sm:block">
                            <CartButton />
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header