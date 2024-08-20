import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { Link } from 'react-router-dom';

const MainProductCard = ({ product }) => {
    return (
        <div className="card card-compact bg-base-100 w-[406px] h-[566px] shadow-xl">
            <figure>
                <Link to={`/product/${product._id}`}>
                    <img
                        className='w-[406px] h-[373px]'
                        src={product.imageURL}
                        alt={product.name} />
                </Link>
            </figure>
            <div className="card-body">
                <Link to={`/product/${product._id}`} className='hover:underline'>
                    <h2 className="card-title text-3xl font-serif">{product.name}</h2>
                    <p className='text-lg'>{product.description.slice(0, 69)}...</p>
                </Link>
                <div className="card-actions flex justify-between">
                    <div className="price">
                        <h6 className='font-serif'>PRICE</h6>
                        <h3 className='font-sans font-semibold text-lg'>${product.price}</h3>
                    </div>
                    <button className="btn btn-secondary">
                        <ShoppingCartIcon className='w-5' />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainProductCard;
