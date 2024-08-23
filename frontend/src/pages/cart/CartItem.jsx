import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <h4>{item.productName}</h4>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price}</p>
      </div>
      <button onClick={() => onRemove(item.productId)}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;