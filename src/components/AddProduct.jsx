import React, { useState } from "react";
import axios from "axios";

// 🔥 Base URL (change only once)
const BASE_URL = "http://localhost:8080";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    quantity: "",
    unit: "",
    discount: "",
    brand: ""
  });

  const [file, setFile] = useState(null);

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
    "Specialty and Local Products"
  ];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("quantity", product.quantity);
    formData.append("unit", product.unit);
    formData.append("discount", product.discount);
    formData.append("brand", product.brand);

    try {
      await axios.post(`${BASE_URL}/api/products/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Product added successfully!");

      setProduct({
        name: "",
        category: "",
        price: "",
        description: "",
        quantity: "",
        unit: "",
        discount: "",
        brand: ""
      });
      setFile(null);
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "28px",
          color: "#222",
          fontWeight: "600",
        }}
      >
        Add Product
      </h2>

      <form onSubmit={handleSubmit}>
        {/* FORM FIELD STYLE */}
        {[
          { label: "Product Name", name: "name", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Quantity", name: "quantity", type: "number" },
          { label: "Unit (kg, litre...)", name: "unit", type: "text" },
          { label: "Discount (%)", name: "discount", type: "number" },
          { label: "Brand", name: "brand", type: "text" },
        ].map((field, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontSize: "15px",
                color: "#444",
                marginBottom: "8px",
                display: "block",
              }}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={product[field.name]}
              onChange={handleChange}
              required={field.name !== "discount" && field.name !== "brand"}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                background: "#fdfdfd",
                fontSize: "15px",
                color: "#333",
              }}
            />
          </div>
        ))}

        {/* CATEGORY */}
        <label
          style={{ fontSize: "15px", color: "#444", marginBottom: "8px", display: "block" }}
        >
          Category
        </label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "2px solid #ccc",
            background: "#fdfdfd",
            fontSize: "15px",
            color: "#333",
          }}
        >
          <option value="">-- Select Category --</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <label
          style={{ fontSize: "15px", color: "#444", marginBottom: "8px", display: "block" }}
        >
          Description
        </label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          style={{
            width: "100%",
            height: "90px",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "2px solid #ccc",
            background: "#fdfdfd",
            fontSize: "15px",
            color: "#333",
          }}
        />

        {/* IMAGE UPLOAD */}
        <label
          style={{ fontSize: "15px", color: "#444", marginBottom: "8px", display: "block" }}
        >
          Upload Image
        </label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            cursor: "pointer",
            background: "#fff",
          }}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#1e90ff",
            color: "#fff",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
