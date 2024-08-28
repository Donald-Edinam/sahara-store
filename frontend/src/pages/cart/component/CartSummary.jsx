import React from 'react';
import { useNavigate } from 'react-router-dom';


const CartSummary = ({ totalProducts, totalQuantity, total, onClearCart }) => {

    const navigate = useNavigate();

    return (
        <div className="stats bg-primary text-primary-content">
            <div className="stat">
                <div className="stat-title">Summary</div>
                <div className="stat-value text-2xl">Total products: ${totalProducts.toFixed(2)}</div>
                <div className="stat-desc">Total quantity: {totalQuantity}</div>
                <div className="stat-actions flex justify-between items-center mt-2">
                    <button className="btn btn-sm btn-error" onClick={onClearCart}>Clear Cart</button>
                    <button
                        onClick={() => navigate("/cart/payment", { state: { total } })} // Pass total as state
                        className="btn btn-sm btn-info"
                    >
                        CHECKOUT: ${total.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;