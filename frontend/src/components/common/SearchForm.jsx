import React from 'react'

const SearchForm = () => {
    return (
        <div className="join">
            <input 
                type="text" 
                placeholder="Search" 
                className="input input-bordered join-item flex-grow"
            />
            <button className="btn btn-secondary join-item">SEARCH</button>
        </div>
    )
}

export default SearchForm