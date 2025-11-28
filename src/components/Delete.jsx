import React, { useEffect, useState } from "react";
import axios from "axios";

// 🔥 Base URLs (change only once)
const BASE_URL = "http://localhost:8080";
const API_URL = `${BASE_URL}/api/products`;

const DeleteProduct = () => {
  const [category, setCategory] = useState("Crops");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Crops",
    "Fruits",
    "Vegetables",
    "Dairy Products",
    "Grains",
    "Herbs",
    "Poultry Products",
    "Organic and Natural Products",
    "Agro-processed Products",
    "Specialty and Local Products",
  ];

  // Fetch products whenever category changes
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/${category}`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error loading products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  // Delete product by ID
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      alert("Error deleting product.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#f5f7fa",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "28px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Delete Product
      </h2>

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "2px solid #ccc",
          background: "#2c2c2c",
          color: "white",
          fontSize: "16px",
          marginBottom: "25px",
        }}
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Loading UI */}
      {loading && (
        <p style={{ fontSize: "18px", fontWeight: "500", color: "#555" }}>
          Loading products...
        </p>
      )}

      {/* No Products */}
      {!loading && products.length === 0 && (
        <p style={{ fontSize: "18px", color: "#777" }}>No products available</p>
      )}

      {/* Product List */}
      <div style={{ marginTop: "20px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* Product Name + Category */}
            <div style={{ textAlign: "left" }}>
              <h3 style={{ margin: 0, fontSize: "18px", color: "#222" }}>
                {p.name}
              </h3>
              <p style={{ margin: "4px 0", color: "#555" }}>
                Category: <b>{p.category}</b>
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteProduct(p.id)}
              style={{
                background: "red",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
