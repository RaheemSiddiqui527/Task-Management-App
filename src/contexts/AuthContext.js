import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        setAuth({
          isAuthenticated: true,
          user: JSON.parse(user),
          token: token,
          loading: false
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Validation
      if (!email || email.trim() === '') {
        throw { msg: 'Please provide an email address' };
      }
      
      if (!password || password.trim() === '') {
        throw { msg: 'Please provide a password' };
      }
      
      if (!email.includes('@')) {
        throw { msg: 'Please provide a valid email address' };
      }
      
      if (password.length < 3) {
        throw { msg: 'Password must be at least 3 characters long' };
      }
      
      // Create mock user
      const mockUser = { 
        id: Date.now().toString(), 
        username: email.split('@')[0], 
        email: email 
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Save to localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update auth state
      setAuth({
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
        loading: false
      });
      
      // Redirect to dashboard
      history.push('/');
    } catch (err) {
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      // Validation
      if (!username || username.trim() === '') {
        throw { msg: 'Please provide a username' };
      }
      
      if (!email || email.trim() === '') {
        throw { msg: 'Please provide an email address' };
      }
      
      if (!password || password.trim() === '') {
        throw { msg: 'Please provide a password' };
      }
      
      if (!email.includes('@')) {
        throw { msg: 'Please provide a valid email address' };
      }
      
      if (password.length < 3) {
        throw { msg: 'Password must be at least 3 characters long' };
      }
      
      // Create mock user
      const mockUser = { 
        id: Date.now().toString(), 
        username: username, 
        email: email 
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Save to localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update auth state
      setAuth({
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
        loading: false
      });
      
      // Redirect to dashboard
      history.push('/');
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export default AuthProvider;