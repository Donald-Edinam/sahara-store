import React from 'react';

const CartSummary = ({ totalProducts, totalQuantity, total, onClearCart }) => {
    return (
        <div className="stats bg-primary text-primary-content">
            <div className="stat">
                <div className="stat-title">Summary</div>
                <div className="stat-value">Total products: ${totalProducts.toFixed(2)}</div>
                <div className="stat-desc">Total quantity: {totalQuantity}</div>
                <div className="stat-actions flex justify-between items-center mt-2">
                    <button className="btn btn-sm btn-error" onClick={onClearCart}>Clear Cart</button>
                    <button className="btn btn-sm btn-info">TOTAL: ${total.toFixed(2)}</button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;