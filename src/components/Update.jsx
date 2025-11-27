import React, { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  // Load all products
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // When user selects a product
  const handleSelect = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id == productId);
    setSelectedProduct(product);
    if (product) setNewPrice(product.price);
  };

  // Update API call
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Select a product first!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:9090/api/products/${selectedProduct.id}`,
        { price: newPrice } // sending only price
      );

      alert("Price updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: "#f0f4f8",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "28px", color: "#333" }}>
        Update Product Price
      </h2>

      {/* Product Dropdown */}
      <select
        onChange={handleSelect}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "2px solid #ccc",
          color: "#fff",
          background: "#2c2c2c",
          marginBottom: "25px",
          cursor: "pointer",
        }}
      >
        <option value="" style={{ color: "#000" }}>Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id} style={{ color: "#000" }}>
            {p.name} (₹{p.price})
          </option>
        ))}
      </select>

      {/* Edit Form */}
      {selectedProduct && (
        <form
          onSubmit={handleUpdate}
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
              color: "#222",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Editing: <span style={{ color: "#1e90ff" }}>{selectedProduct.name}</span>
          </h3>

          {/* Price Input */}
          <label style={{ fontSize: "16px", fontWeight: "bold", color: "#444" }}>
            New Price (₹)
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "2px solid #ccc",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#1e90ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Update Price
          </button>
        </form>
      )}
    </div>
  );
};

export default Update;
