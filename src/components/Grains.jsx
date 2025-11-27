import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'http://localhost:9090/api/products/images';

const Grains = () => {
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrains = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/products/grains');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGrains(data);
        setError(null);
      } catch (error) {
        setError('Failed to load grains. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGrains();
  }, []);

  const handleAddToCart = (grain) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to the cart!');
      navigate('/login');
      return;
    }

    addToCart(grain);
    alert(`${grain.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) {
    return <div className="product-container">Loading grains...</div>;
  }

  if (error) {
    return <div className="product-container error">{error}</div>;
  }

  return (
    <div className="product-container">
      <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Available Grains</h2>

      <div className="product-grid">
        {grains.length > 0 ? (
          grains.map((grain) => (
            <div key={grain.id} className="product-card">

              {/* IMAGE */}
              <div className="image-container">
                <img
                  src={`${IMAGE_BASE_URL}/${grain.imagePath}`}
                  alt={grain.name || 'Grain'}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                    display: 'block',
                    backgroundColor: '#f5f5f5'
                  }}
                />
              </div>

              {/* DESCRIPTION BOX */}
              <input
                type="text"
                value={grain.description || ""}
                readOnly
                className="description-box"
                placeholder="Description goes here"
                style={{
                  width: '90%',
                  margin: '10px auto',
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  display: 'block',
                  fontSize: '15px',
                }}
              />

              {/* PRODUCT INFO */}
              <div className="product-info">
                <h4 style={{ margin: '10px 0 5px 0' }}>
                  {grain.name || 'Unknown Grain'}
                </h4>

                {/* PRICE WITH ₹ FORMAT */}
                <p
                  className="price"
                  style={{
                    margin: '5px 0 10px 0',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#1e90ff',
                  }}
                >
                  ₹ {grain.price ? Number(grain.price).toLocaleString('en-IN') : '0.00'}
                </p>

                <button
                  className="add-to-cart-btn"
                  style={{ margin: '0 0 10px 0' }}
                  onClick={() => handleAddToCart(grain)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))
        ) : (
          <p>No grains available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Grains;
