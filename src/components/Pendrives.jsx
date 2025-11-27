import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = 'http://localhost:9090/api/products/images';

const Dairy = () => {
  const [dairy, setDairy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDairy = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/products/dairy');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDairy(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dairy products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDairy();
  }, []);

  const handleAddToCart = (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to the cart!');
      navigate('/login');
      return;
    }
    addToCart(item);
    alert(`${item.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) return <div className="product-container">Loading dairy products...</div>;
  if (error) return <div className="product-container error">{error}</div>;

  return (
    <div className="product-container">
      <h2>Available Dairy Products</h2>
      <div className="product-grid">
        {dairy.length > 0 ? (
          dairy.map((item) => (
            <div key={item.id} className="product-card">
              <div className="image-container">
                <img
                  src={`${IMAGE_BASE_URL}/${item.imagePath}`}
                  alt={item.name || 'Dairy Product'}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h4>{item.name || 'Unknown Dairy Product'}</h4>
                <p className="price">${item.price ? item.price.toFixed(2) : '0.00'}</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No dairy products available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Dairy;
