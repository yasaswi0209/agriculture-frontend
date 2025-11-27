import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = 'http://localhost:9090/api/products/images';

const Vegetables = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/products/vegetables');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVegetables(data);
        setError(null);
      } catch (err) {
        setError('Failed to load vegetables. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVegetables();
  }, []);

  const handleAddToCart = (veg) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to the cart!');
      navigate('/login');
      return;
    }
    addToCart(veg);
    alert(`${veg.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) return <div className="product-container">Loading vegetables...</div>;
  if (error) return <div className="product-container error">{error}</div>;

  return (
    <div className="product-container">
      <h2>Available Vegetables</h2>
      <div className="product-grid">
        {vegetables.length > 0 ? (
          vegetables.map((veg) => (
            <div key={veg.id} className="product-card">
              <div className="image-container">
                <img
                  src={`${IMAGE_BASE_URL}/${veg.imagePath}`}
                  alt={veg.name || 'Vegetable'}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                    display: 'block'
                  }}
                />
              </div>
              <div className="product-info">
                <h4 style={{ margin: '10px 0 5px 0' }}>{veg.name || 'Unknown Vegetable'}</h4>
                <p className="price" style={{ margin: '5px 0 10px 0' }}>
                  ${veg.price ? veg.price.toFixed(2) : '0.00'}
                </p>
                <button
                  className="add-to-cart-btn"
                  style={{ margin: '0 0 10px 0' }}
                  onClick={() => handleAddToCart(veg)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No vegetables available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Vegetables;
