import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_ROUTE } from '../services/axiosConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();


  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get( `${API_ROUTE}/api/carts`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/carts', { productId, quantity }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    setLoading(true);
    try {
      const response = await axios.put('/api/carts', { productId, quantity }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.delete('/api/carts', {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { productId }
      });
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, loading, error, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);