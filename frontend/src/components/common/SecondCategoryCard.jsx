import React from 'react'

const SecondCategoryCard = () => {
    return (
        <div className="card card-side flex w-[572px] h-[198px] flex-reverse bg-base-100 shadow-lg">
            <div className="card-body mt-5 flex flex-col flex-5 items-centee">
                <h2 className="card-title font-serif">Clothing Casuals</h2>
                <p>
                Explore the elegant African print in perfect convenience
                </p>
            </div>
            <figure>
                <img
                    src="https://picsum.photos/seed/picsum/150/250"
                    alt="ALT" />
            </figure>
        </div>
    )
}

export default SecondCategoryCard
