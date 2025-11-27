import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:9090/api/products/images";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateCartQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9090/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) setSelectedProductId(data[0].id);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleAddItem = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      navigate("/cart");
    } else {
      alert("Select a product first");
    }
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    updateCartQuantity(id, quantity);
  };

  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <>
      <div
        style={{
          maxWidth: 700,
          margin: "20px auto",
          fontFamily: "Arial, sans-serif",
          background: "#f0f8ff",
          padding: 20,
          borderRadius: 10,
          color: "#333",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          🛒 Shopping Cart
        </h2>

        {/* PRODUCT SELECTOR */}
        <select
          value={selectedProductId || ""}
          onChange={(e) => setSelectedProductId(Number(e.target.value))}
          style={{
            marginBottom: 10,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #888",
            width: "100%",
          }}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

       <div style={{ marginBottom: 10 }}>
  <button
    onClick={handleAddItem}
    style={{
      marginRight: 10,
      color: "black",        // 🔥 TEXT COLOR CHANGED
      background: "#e0e0e0", // optional for better visibility
      padding: "8px 14px",
      borderRadius: 6,
      border: "1px solid #999"
    }}
  >
    Add Item
  </button>

  <button
    onClick={handleClearCart}
    style={{
      color: "black",        // 🔥 TEXT COLOR CHANGED
      background: "#e0e0e0", // optional
      padding: "8px 14px",
      borderRadius: 6,
      border: "1px solid #999"
    }}
  >
    Clear Cart
  </button>
</div>


        {/* CART ITEMS */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item, index) => {
              const cleanImagePath = item.imagePath.replace(
                /^api\/products\/images\//,
                ""
              );
              return (
                <div
                  key={`${item.id}-${index}`}  // 🔥 FIXED UNIQUE KEY
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 15,
                    gap: 12,
                    background: "#fff",
                    padding: 10,
                    borderRadius: 8,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* PRODUCT IMAGE */}
                  <img
                    src={`${BASE_URL}/${cleanImagePath}`}
                    alt={item.name}
                    style={{
                      borderRadius: 6,
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                    }}
                  />

                  {/* NAME */}
                  <h4 style={{ width: 90 }}>{item.name}</h4>

                  {/* PRICE */}
                  <p style={{ fontWeight: "bold", minWidth: 60 }}>
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                  {/* QTY */}
                  <label htmlFor={`quantity-${item.id}`}>Qty:</label>

                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    style={{
                      width: 60,
                      padding: 6,
                      border: "2px solid #1e90ff",
                      borderRadius: 6,
                      backgroundColor: "#ffffff",
                      color: "#000",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                      MozAppearance: "textfield",
                      WebkitAppearance: "none",
                    }}
                  />

                  {/* TOTAL FOR ITEM */}
                  <span style={{ minWidth: 90, textAlign: "left" }}>
                    = ₹
                    {Number(
                      item.price * (item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </span>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: "auto",
                      background: "red",
                      color:"black",
                      borderRadius: 6,
                      padding: "5px 10px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            {/* GRAND TOTAL */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "right",
                marginTop: 20,
              }}
            >
              Total: ₹{Number(totalAmount).toLocaleString("en-IN")}
            </div>

            <button
              onClick={handleCheckout}
              style={{
                marginTop: 10,
                width: "100%",
                padding: 10,
                background: "#1e90ff",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: 16,
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {/* REMOVE SPIN BUTTONS FOR FIREFOX/CHROME */}
      <style>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Cart;
