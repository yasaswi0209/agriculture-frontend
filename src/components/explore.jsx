import React, { useState, useEffect } from 'react';

function Explore() {
  const [orders, setOrders] = useState([]);
  const [salesAnalytics, setSalesAnalytics] = useState(null);
  const [marketTrends, setMarketTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user orders
    fetch('http://localhost:9090/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(console.error);

    // Fetch sales analytics (example aggregated data)
    fetch('http://localhost:9090/api/sales/analytics')
      .then((res) => res.json())
      .then((data) => setSalesAnalytics(data))
      .catch(console.error);

    // Fetch market trends data (could be from external service)
    fetch('http://localhost:9090/api/market/trends')
      .then((res) => res.json())
      .then((data) => setMarketTrends(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading data...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Explore Dashboard</h2>
      
      <section style={{ marginBottom: 40 }}>
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                Order #{order.id} - {order.status} - ${order.totalAmount} - {new Date(order.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>
      
      <section style={{ marginBottom: 40 }}>
        <h3>Sales Analytics</h3>
        {salesAnalytics ? (
          <div>
            <p>Total Sales: ${salesAnalytics.totalSales}</p>
            <p>Monthly Growth: {salesAnalytics.monthlyGrowthPercent}%</p>
            <p>Top Selling Product: {salesAnalytics.topProductName}</p>
          </div>
        ) : (
          <p>No sales analytics data available.</p>
        )}
      </section>
      
      <section>
        <h3>Market Trends</h3>
        {marketTrends ? (
          <ul>
            {marketTrends.map((trend, index) => (
              <li key={index}>
                <b>{trend.title}</b>: {trend.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No market trends data available.</p>
        )}
      </section>
    </div>
  );
}

export default Explore;
