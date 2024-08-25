import React from 'react';
import PropTypes from 'prop-types';

const CartSummary = ({ items }) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

CartSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default CartSummary;