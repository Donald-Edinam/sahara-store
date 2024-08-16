import React from 'react'

const ProductCard = () => {
    return (
        <>
            <div className="card border-2 border-amber-800 rounded-[10px] bg-base-100 w-[350px] h-[401px] shadow-md">
                <figure>
                    <img
                        src="https://picsum.photos/350/400/"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h1 className="font-serif text-2xl text-center">Arts and Design</h1>
                </div>
            </div>
        </>
    )
}

export default ProductCard
