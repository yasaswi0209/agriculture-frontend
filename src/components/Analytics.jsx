import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F", "#0088FE"];

const Analytics = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ------ Category Wise Count ------
  const categoryCount = Object.values(
    products.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || { category: curr.category, count: 0 };
      acc[curr.category].count += 1;
      return acc;
    }, {})
  );

  // ------ Price Line Chart Data ------
  const priceData = products.map((p, index) => ({
    index: index + 1,
    name: p.name,
    price: p.price,
  }));

  // ------ Stock Pie Chart ------
  const stockData = products.map((p) => ({
    name: p.name,
    value: p.quantity || 0,
  }));

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Product Analytics Dashboard</h1>

      {/* Total Products */}
      <div
        style={{
          padding: "15px",
          background: "#eee",
          borderRadius: "10px",
          margin: "20px 0",
          width: "220px",
        }}
      >
        <h3>Total Products: {products.length}</h3>
      </div>

      {/* ===== CATEGORY BAR CHART ===== */}
      <h2>Category-wise Product Count</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryCount}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* ===== PRICE LINE CHART ===== */}
      <h2 style={{ marginTop: "40px" }}>Price Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={priceData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* ===== STOCK PIE CHART ===== */}
      <h2 style={{ marginTop: "40px" }}>Stock (Quantity) Overview</h2>
      <ResponsiveContainer width="70%" height={350}>
        <PieChart>
          <Pie
            data={stockData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          >
            {stockData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
