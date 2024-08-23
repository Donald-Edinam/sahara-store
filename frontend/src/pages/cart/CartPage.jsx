import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`/api/carts/${productId}`);
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      setError('Failed to remove item.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItem key={item.productId} item={item} onRemove={handleRemoveItem} />
          ))}
          <CartSummary items={cartItems} />
        </div>
      )}
    </div>
  );
};

export default CartPage;