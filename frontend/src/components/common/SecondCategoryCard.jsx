import React from 'react'

const SecondCategoryCard = ({ data }) => {

    const { name, image, description } = data;

    return (
        <div className="card flex flex-1 min-w-[350px] max-w-[400px] card-side bg-base-100 shadow-lg">
            <div className="card-body mt-5 flex flex-col flex-5 items-centee">
                <h2 className="card-title font-serif">{name}</h2>
                <p>
                    {description}
                </p>
            </div>
            <figure>
                <img
                    className='min-h-[200px] max-h-[250px]'
                    src={image}
                    alt="ALT" />
            </figure>
        </div>
    )
}

export default SecondCategoryCard
