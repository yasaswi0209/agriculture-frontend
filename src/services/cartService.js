import axios from "axios";

// Read API URL from Vite environment (in Docker)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Cart API base path
const CART_API_URL = `${API_BASE_URL}/api/cart`;

export const addToCart = async (userId, productId) => {
  return await axios.post(`${CART_API_URL}/add`, {
    userId,
    productId,
    quantity: 1,
  });
};

export const getCartItems = async (userId) => {
  const response = await axios.get(`${CART_API_URL}/user/${userId}`);
  return response.data;
};

export const clearCart = async (userId) => {
  return await axios.delete(`${CART_API_URL}/clear/${userId}`);
};

export const removeCartItem = async (cartItemId) => {
  try {
    await axios.delete(`${CART_API_URL}/remove/${cartItemId}`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};
