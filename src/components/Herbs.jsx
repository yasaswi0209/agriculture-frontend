import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Base URL for fetching herb images (same as grains/crops)
const IMAGE_BASE_URL = 'http://localhost:9090/api/products/images';

const Herbs = () => {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch products of category 'herbs' using same URL pattern
  useEffect(() => {
    const fetchHerbs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/products/herbs'); // endpoint for herbs
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched herbs:', data); // Debug log
        setHerbs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching herbs:', error);
        setError('Failed to load herbs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHerbs();
  }, []);

  // Handle adding herb to cart
  const handleAddToCart = (herb) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to the cart!');
      navigate('/login');
      return;
    }

    addToCart(herb);
    alert(`${herb.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) {
    return <div className="product-container">Loading herbs...</div>;
  }

  if (error) {
    return <div className="product-container error">{error}</div>;
  }

  return (
    <div className="product-container">
      <h2>Available Herbs</h2>
      <div className="product-grid">
        {herbs.length > 0 ? (
          herbs.map((herb) => (
            <div key={herb.id} className="product-card">
              <div className="image-container">
                <img
                  src={`${IMAGE_BASE_URL}/${herb.imagePath}`}
                  alt={herb.name || 'Herb'}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                    display: 'block',
                  }}
                />
              </div>
              <div className="product-info">
                <h4 style={{ margin: '10px 0 5px 0' }}>{herb.name || 'Unknown Herb'}</h4>
                <p className="price" style={{ margin: '5px 0 10px 0' }}>
                  ${herb.price ? herb.price.toFixed(2) : '0.00'}
                </p>
                <button
                  className="add-to-cart-btn"
                  style={{ margin: '0 0 10px 0' }}
                  onClick={() => handleAddToCart(herb)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No herbs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Herbs;
