import React from 'react'

const MainProductCard = ({product}) => {

    console.log("Each product", product.title)

    return (
        <>
            <div className="card card-compact bg-base-100 w-[406px] h-[566px] shadow-xl">
                <figure>
                    <img
                        className='w-[406px] h-[373px]'
                        src={product.images[0]}
                        alt="Shoes" />
        
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-serif">{product.title}</h2>
                    <p className='text-lg'>{product.description.slice(0, 69)}...</p>
                    <div className="card-actions flex justify-between">
                        <div className="price">
                            <h6 className='font-serif'>PRICE</h6>
                            <h3 className='font-sans font-semibold text-lg'>${`${product.price}`}</h3>
                            <p></p>
                        </div>
                        <button className="btn btn-secondary">Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainProductCard
