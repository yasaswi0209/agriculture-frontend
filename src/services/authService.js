import axios from "axios";

// Read backend URL from Vite environment
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Auth API base URL
const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const login = async (email, password) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
  
  // Save token
  localStorage.setItem("token", response.data);
  
  return response.data;
};

export const signup = async (username, email, password) => {
  return axios.post(`${AUTH_API_URL}/signup`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};
