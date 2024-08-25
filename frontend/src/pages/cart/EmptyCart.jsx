import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <>
        <div className="flex flex-col justify-center items-center py-10 mt-10">
            <h1 className='font-serif text-center font-serif text-3xl'>Oops! Your Cart is Empty.</h1>
            <Link to={"/"} className='font-bold text-center underline'>
                Start Shopping!
            </Link>
        </div>
    </>
  )
}

export default EmptyCart
