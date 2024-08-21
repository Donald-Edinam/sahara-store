import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_ROUTE } from '../services/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_ROUTE}/auth/register`, userData);
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_ROUTE}/auth/login`, credentials);
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};