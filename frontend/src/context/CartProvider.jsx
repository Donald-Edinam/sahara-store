import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { API_ROUTE } from '../services/axiosConfig';
import { jwtDecode } from 'jwt-decode';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userState } = useContext(AuthContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const getUserId = () => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      
      if (decodedToken.exp * 1000 < Date.now()) {
        console.error('Token has expired');
        return null;
      }
      
      return decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
 
  const fetchCart = async () => {
    if (!userState || !token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/api/cart`, {
        headers: { 
          Authorization: token
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  const addToCart = async (productId, quantity) => {
    if (!userState || !token) return;
    setLoading(true);
    try {
      // Check if the product already exists in the cart
      let existingItem = null;
      if (cart && cart.items) {
        existingItem = cart.items.find(item => item.productId === productId);
      }
  
      if (existingItem) {
        // If the item already exists, update its quantity
        const updatedQuantity = existingItem.quantity + quantity;
  
        // Make a PUT request to update the quantity on the server
        const response = await fetch(`${API_ROUTE}/api/carts`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId, quantity: updatedQuantity })
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
        const updatedCart = await response.json();
        setCart(updatedCart);  // Update the cart state with the new data
  
      } else {
        // If the item does not exist, add it as a new item
        const response = await fetch(`${API_ROUTE}/api/carts`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId, quantity })
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
        const newItem = await response.json();
        setCart(prevCart => ({
          ...prevCart,
          items: [...(prevCart.items || []), newItem]  // Add new item to the existing items array
        }));
      }
  
      setError(null);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const updateCartItem = async (productId, quantity) => {
    if (!userState || !token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/api/carts`, {
        method: 'PUT',
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!userState || !token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_ROUTE}/api/carts`, {
        method: 'DELETE',
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCart(data);
      setError(null);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  }

  useEffect(() => {
    if (userState) {
      fetchCart();
      localStorage.setItem("cart", cart);
    } else {
      setCart(null);
    }
  }, [userState, token]);

  return (
    <CartContext.Provider value={{ cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};