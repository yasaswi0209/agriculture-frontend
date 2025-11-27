import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "http://localhost:9090/api/products/images";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");  // MySQL user ID stored after login

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:9090/api/orders/user/${userId}`)
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading orders", err);
        setLoading(false);
      });
  }, [userId]);

  if (!userId) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>My Orders</h2>
        <p style={styles.noLogin}>Please login to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>My Orders</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={styles.orderCard}>
            <div style={styles.orderTop}>
              <img
                src={
                  order.imagePath
                    ? `${IMAGE_BASE_URL}/${order.imagePath}`
                    : "https://via.placeholder.com/110"
                }
                alt={order.productName}
                style={styles.image}
              />

              <div>
                <h3 style={styles.productName}>{order.productName}</h3>
                <p style={styles.category}>Category: {order.category}</p>
                <p style={styles.price}>Price: ₹{order.price}</p>
                <p style={styles.qty}>Qty: {order.quantity}</p>

                <p style={styles.total}>
                  Total: ₹{order.price * order.quantity}
                </p>
              </div>
            </div>

            <div style={styles.orderBottom}>
              <p style={styles.date}>
                📅 Ordered On:{" "}
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleDateString()
                  : "N/A"}
              </p>

              <p style={styles.status}>
                🟢 Status: <strong>{order.status || "Pending"}</strong>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "12px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    color: "#1e3a8a",
    fontWeight: "bold",
  },
  noLogin: {
    textAlign: "center",
    color: "#555",
  },
  noOrders: {
    textAlign: "center",
    padding: "20px",
    fontSize: "18px",
    color: "#777",
  },
  orderCard: {
    background: "#ffffff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
  orderTop: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  image: {
    width: "110px",
    height: "110px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  productName: {
    fontSize: "20px",
    marginBottom: "5px",
    color: "#000",
  },
  category: {
    fontSize: "14px",
    color: "#666",
  },
  price: {
    fontSize: "16px",
    fontWeight: "500",
  },
  qty: {
    fontSize: "16px",
    marginTop: "5px",
  },
  total: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "8px",
    color: "#1e40af",
  },
  orderBottom: {
    marginTop: "12px",
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  date: {
    fontSize: "14px",
    color: "#444",
  },
  status: {
    fontSize: "14px",
    fontWeight: "500",
    color: "green",
  },
};
