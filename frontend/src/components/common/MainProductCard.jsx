import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartProvider';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

// Define and export handleAddToCart outside the component
export const handleAddToCart = async (productId, quantity, addToCart, userState, setIsAdding) => {
    setIsAdding(true);
    
    if (!userState) {
        toast.error("Login to add items to cart");
        setIsAdding(false);
    } else {
        try {
            await addToCart(productId, quantity);
            toast.success("Added to cart successfully");
        } catch (error) {
            console.error("Error", error);
            toast.error("Error adding to Cart");
        } finally {
            setIsAdding(false);
        }
    }
};

const MainProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { userState } = useContext(AuthContext);

    const [isAdding, setIsAdding] = useState(false);

    const handleClickAddToCart = (productId, quantity) => {
        if (isAdding) return; // Prevent multiple simultaneous requests
        handleAddToCart(productId, quantity, addToCart, userState, setIsAdding);
    };

    return (
        <>
            <Toaster />
            <div className="card card-compact bg-base-100 w-[350px] h-[566px] shadow-xl">
                <figure>
                    <Link to={`/product/${product._id}`}>
                        <img
                            className='w-[406px] h-[373px]'
                            src={product.imageURL}
                            alt={product.name}
                        />
                    </Link>
                </figure>
                <div className="card-body">
                    <Link to={`/product/${product._id}`} className='hover:underline'>
                        <h2 className="card-title text-3xl font-serif">{product.name}</h2>
                        <p className='text-lg'>{product.description.slice(0, 69)}...</p>
                    </Link>
                    <div className="card-actions flex justify-between">
                        <div className="price">
                            <h6 className='font-serif'>PRICE</h6>
                            <h3 className='font-sans font-semibold text-lg'>${product.price}</h3>
                        </div>
                        <button
                            onClick={() => handleClickAddToCart(product._id, 1)}
                            className="btn btn-secondary"
                            disabled={isAdding}
                        >
                            {isAdding ? 'Adding...' : (
                                <>
                                    <ShoppingCartIcon className='w-5' />
                                    <span>Add to Cart</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainProductCard;
