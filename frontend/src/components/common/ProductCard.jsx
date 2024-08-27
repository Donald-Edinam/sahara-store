import React from 'react'

const ProductCard = ({ data }) => {

    const { name, image } = data

    return (
        <>
            <div className="card border-2 border-amber-800 rounded-[10px] bg-base-100 w-[300px] h-[401px] shadow-md">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h1 className="font-serif text-2xl text-center">{name}</h1>
                </div>
            </div>
        </>
    )
}

export default ProductCard
