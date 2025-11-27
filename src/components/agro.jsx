import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Base URL for fetching product images
const IMAGE_BASE_URL = 'http://localhost:9090/api/products/images';

const AgroProcessedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch products of category 'agro_processed' from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/products/agro_processed');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched agro processed products:', data); // Debug log
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching agro processed products:', error);
        setError('Failed to load agro processed products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to the cart!');
      navigate('/login');
      return;
    }

    addToCart(product);
    alert(`${product.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) {
    return <div className="product-container">Loading agro processed products...</div>;
  }

  if (error) {
    return <div className="product-container error">{error}</div>;
  }

  return (
    <div className="product-container">
      <h2>Available Agro-processed Products</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-container">
                <img
                  src={`${IMAGE_BASE_URL}/${product.imagePath}`}
                  alt={product.name || 'Product'}
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
                <h4 style={{ margin: '10px 0 5px 0' }}>{product.name || 'Unknown Product'}</h4>
                <p className="price" style={{ margin: '5px 0 10px 0' }}>
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </p>
                <button
                  className="add-to-cart-btn"
                  style={{ margin: '0 0 10px 0' }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No agro processed products available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AgroProcessedProducts;
