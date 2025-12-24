import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

// Create context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("mockUser");
    
    console.log('AuthContext mount - token:', token, 'storedUser:', storedUser);
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setToken(token);
        console.log('User authenticated on mount:', userData);
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem("token");
        localStorage.removeItem("mockUser");
      }
    }
    
    setLoading(false);
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (isAuthenticated && user && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("mockUser", JSON.stringify(user));
      console.log('Auth state updated, localStorage refreshed');
    }
  }, [isAuthenticated, user, token]);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      if (registeredUsers.find(u => u.email === userData.email)) {
        return { success: false, error: "Email already registered" };
      }
      
      const newUser = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || "guest"
      };
      
      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password, loginType) => {
    try {
      setError(null);
      setLoading(true);
      
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const user = registeredUsers.find(u => u.email === email);
      
      if (!user) {
        return { success: false, error: "User not found. Please register first." };
      }
      
      if (user.password !== password) {
        return { success: false, error: "Invalid password" };
      }
      
      if (user.role === 'host' && loginType === 'guest') {
        return { 
          success: false, 
          error: "Host users cannot log in as guests. Please select 'List my properties (Host)' to login.",
          isRoleError: true 
        };
      }
      
      if (user.role === 'guest' && loginType === 'host') {
        return { 
          success: false, 
          error: "Guest users cannot log in as hosts. Please select 'Book properties (Guest)' to login.",
          isRoleError: true 
        };
      }
      
      const mockToken = "mock-token";
      const userData = { name: user.name, email: user.email, role: user.role };
      
      // Store in localStorage IMMEDIATELY
      localStorage.setItem("token", mockToken);
      localStorage.setItem("mockUser", JSON.stringify(userData));
      
      // Update state
      setToken(mockToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('Login successful - auth data stored:', userData);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("mockUser");
    
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    console.log('User logged out');
  }, []);

  // Check if user is host
  const isHost = user?.role === 'host';
  
  // Check if user is guest
  const isGuest = user?.role === 'guest' || !user?.role;

  // Clear error
  const clearError = () => setError(null);

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isHost,
    isGuest,
    token,
    register,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
