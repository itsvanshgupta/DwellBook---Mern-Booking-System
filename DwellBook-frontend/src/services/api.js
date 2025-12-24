import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 for authentication endpoints, not for booking endpoints
    // since we're using mock authentication
    if (error.response?.status === 401 && error.config?.url?.includes('/auth/')) {
      localStorage.removeItem("token");
      localStorage.removeItem("mockUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
