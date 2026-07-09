import axios from "axios";

// const API_URL = "http://localhost:5000/api";\
const API_URL = "https://real-estate-smoky-nine.vercel.app/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - Add token to headers
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
  },
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear token and user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login if not already there
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access forbidden:", error.response.data?.message);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data?.message);
    }

    return Promise.reject(error);
  },
);

export default api;
