import React from 'react'

const MainProductCard = () => {
    return (
        <>
            <div className="card card-compact bg-base-100 w-[406px] h-[566px] shadow-xl">
                <figure>
                    <img
                        className='w-[406px] h-[373px]'
                        src="https://dummyimage.com/600x400/70350D/f77c4f"
                        alt="Shoes" />
        
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-serif">African Black Soap</h2>
                    <p className='text-lg'>Look great with our African s...</p>
                    <div className="card-actions flex justify-between">
                        <div className="price">
                            <h6 className='font-serif'>PRICE</h6>
                            <h3 className='font-sans font-semibold text-lg'>${`23.99`}</h3>
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
