import { ShoppingCartIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Link } from 'react-router-dom'

const MainProductCard = ({ product }) => {

    console.log("Each product", product.title)

    return (
        <>
            <div className="card card-compact bg-base-100 w-[406px] h-[566px] shadow-xl">
                <figure>
                    <Link to={`product/${product.id}`}>
                        <img
                            className='w-[406px] h-[373px]'
                            src={product.images[0]}
                            alt="Shoes" />
                    </Link>
                </figure>
                <div className="card-body">
                    <Link to={`product/${product.id}`} className='hover:underline'>
                        <h2 className="card-title text-3xl font-serif">{product.title}</h2>
                        <p className='text-lg'>{product.description.slice(0, 69)}...</p>
                    </Link>
                    <div className="card-actions flex justify-between">
                        <div className="price">
                            <h6 className='font-serif'>PRICE</h6>
                            <h3 className='font-sans font-semibold text-lg'>${`${product.price}`}</h3>
                        </div>
                        <button className="btn btn-secondary">
                            <ShoppingCartIcon className='w-5' />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainProductCard
