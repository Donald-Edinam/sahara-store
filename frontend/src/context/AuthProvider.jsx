import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { API_ROUTE } from '../services/axiosConfig';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState(() => {
    // Get user from localStorage if it exists
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userState) {
      localStorage.setItem('user', JSON.stringify(userState));
    } else {
      localStorage.removeItem('user');
    }
  }, [userState]);

  const [loading, setLoading] = useState(false);
  const [serverError, setError] = useState(null);

  const registerUser = async (credentials) => {
    setLoading(true);
    try {
      console.log('Sending registration data:', credentials);
      const response = await axios.post(`${API_ROUTE}/auth/register`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      
      setError(null);
      return response.data;
    } catch (serverError) {
      console.error('Full server error response:', serverError.response);
      setError(serverError?.response?.data?.message || "Registration failed");
      throw serverError;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_ROUTE}/auth/login`, credentials);
      setUserState(response.data.user); // Update the user state with the `user` property
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store the user data in localStorage
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      setError(null);
    } catch (serverError) {
      console.error('Login failed', serverError);
      setError(serverError?.response?.data?.message); // Update the error state with the `message` property
    } finally {
      setLoading(false);
    }
  };


  const logoutUser = () => {
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ userState, loading, serverError, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};