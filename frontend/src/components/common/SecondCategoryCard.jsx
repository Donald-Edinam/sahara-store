import React from 'react'

const SecondCategoryCard = () => {
    return (
        <div className="card flex flex-1 min-w-[350px] max-w-[400px] card-side bg-base-100 shadow-lg">
            <div className="card-body mt-5 flex flex-col flex-5 items-centee">
                <h2 className="card-title font-serif">Clothing Casuals</h2>
                <p>
                    Explore the elegant African print in perfect convenience
                </p>
            </div>
            <figure>
                <img
                    className='min-h-[200px] max-h-[250px]'
                    src="https://picsum.photos/seed/picsum/150/300"
                    alt="ALT" />
            </figure>
        </div>
    )
}

export default SecondCategoryCard
