import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Use Kubernetes backend URL from Vite
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Image base URL
const IMAGE_BASE_URL = `${API_BASE_URL}/api/products/images`;

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/products/crops`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setCrops(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load crops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleAddToCart = (crop) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to add items to the cart!');
      navigate('/login');
      return;
    }

    addToCart(crop);
    alert(`${crop.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) {
    return <div className="product-container">Loading crops...</div>;
  }

  if (error) {
    return <div className="product-container error">{error}</div>;
  }

  return (
    <div className="product-container">
      <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Available Crops</h2>
      <div className="product-grid">
        {crops.length > 0 ? (
          crops.map((crop) => (
            <div key={crop.id} className="product-card">
              <div className="image-container">
                <img
                  src={`${IMAGE_BASE_URL}/${crop.imagePath}`}
                  alt={crop.name || 'Crop'}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                    display: 'block',
                    backgroundColor: '#f5f5f5',
                  }}
                />
              </div>

              <div className="product-info">
                <h4 style={{ margin: '10px 0 5px 0' }}>
                  {crop.name || 'Unknown Crop'}
                </h4>

                <p
                  className="price"
                  style={{
                    margin: '5px 0 10px 0',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#1e90ff',
                  }}
                >
                  ₹ {crop.price ? Number(crop.price).toLocaleString('en-IN') : '0.00'}
                </p>

                <button
                  className="add-to-cart-btn"
                  style={{ margin: '0 0 10px 0' }}
                  onClick={() => handleAddToCart(crop)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No crops available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Crops;
