import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Payment = () => {
  const { cartItems, completePayment } = useCart();
  const navigate = useNavigate();

  const handlePayment = () => {
    completePayment();
    alert("Payment Successful!");
    navigate("/orders");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        padding: "20px",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#222",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Payment
        </h2>

        {cartItems.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#777",
            }}
          >
            No items to checkout
          </p>
        ) : (
          <>
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#f6f6f6",
                    padding: "16px",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        color: "#444",
                        fontWeight: "600",
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        color: "#555",
                      }}
                    >
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePayment}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "20px",
                background: "#0fa80f",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "0.3s",
                marginTop: "10px",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0b7d0b")}
              onMouseOut={(e) => (e.target.style.background = "#0fa80f")}
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
