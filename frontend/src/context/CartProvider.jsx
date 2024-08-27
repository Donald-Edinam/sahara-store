import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { API_ROUTE } from '../services/axiosConfig';
import { jwtDecode } from 'jwt-decode';  // Use without curly braces if it's a default export

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userState } = useContext(AuthContext);
  const [cart, setCart] = useState({ products: [], total: 0, quantity: 0 });
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

  const loggedUserID = getUserId(token);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const saveCartToDatabase = async (cartItem) => {
    try {
      const response = await fetch(`${API_ROUTE}/api/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: loggedUserID,
          productId: cartItem.productId,
          quantity: cartItem.quantity
        })
      });
      if (!response.ok) throw new Error('Failed to save cart item to database');
    } catch (err) {
      console.error('Error saving cart item to database:', err);
      throw err;
    }
  };

  const fetchCartFromDatabase = async () => {
    try {
      const response = await fetch(`${API_ROUTE}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch cart from database');
      const data = await response.json();
      setCart(data)
      return data;
    } catch (err) {
      console.error('Error fetching cart from database:', err);
      throw err;
    }
  };

  
  const addToCart = async (productId, quantity) => {
    setLoading(true);
    try {
      const updatedCart = { ...cart };
      const existingItemIndex = updatedCart.products.findIndex(item => item.productId === productId);

      if (existingItemIndex !== -1) {
        updatedCart.products[existingItemIndex].quantity += quantity;
      } else {
        updatedCart.products.push({ productId, quantity });
      }

      updatedCart.quantity += quantity;
      // You might want to update the total price here as well if you have product price information

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);

      if (userState) {
        await saveCartToDatabase({ productId, quantity });
      }

      setError(null);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message || 'An error occurred while adding to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const updatedCart = Array.isArray(cart) ? cart.filter(item => item.productId !== productId) : [];

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);

      if (userState) {
        await fetch(`${API_ROUTE}/api/carts/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      setError(null);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message || 'An error occurred while removing from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    setLoading(true);
    try {
      const updatedCart = Array.isArray(cart) ? cart.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }) : [];

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);

      if (userState) {
        await fetch(`${API_ROUTE}/api/carts/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ quantity: newQuantity })
        });
      }

      setError(null);
    } catch (err) {
      console.error('Error updating cart item quantity:', err);
      setError(err.message || 'An error occurred while updating cart item quantity');
    } finally {
      setLoading(false);
    }
  };
  
  const clearCart = async () => {
    setLoading(true);
    try {
      // Clear local cart state
      const emptyCart = {
        products: [],
        total: 0,
        quantity: 0,
      };
      
      setCart(emptyCart);
      saveCartToLocalStorage(emptyCart);
  
      // If the user is authenticated, clear the cart on the server as well
      if (userState) {
        const response = await fetch(`${API_ROUTE}/api/carts`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          const errorMessage = await response.text(); // or response.json() if your server responds with JSON
          throw new Error(`Failed to clear cart: ${errorMessage}`);
        }
      }
  
      setError(null);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message || 'An error occurred while clearing the cart');
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      try {
        let cartData;
        if (userState) {
          cartData = await fetchCartFromDatabase();
        } else {
          cartData = JSON.parse(localStorage.getItem('cart')) || { products: [], total: 0, quantity: 0 };
        }
        setCart(cartData);
      } catch (err) {
        console.error('Error initializing cart:', err);
        setError(err.message || 'An error occurred while initializing cart');
        setCart({ products: [], total: 0, quantity: 0 });
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, [userState]);

  return (
    <CartContext.Provider value={{ cart, loading, error, addToCart, removeFromCart, updateCartItemQuantity, clearCart, fetchCartFromDatabase }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
