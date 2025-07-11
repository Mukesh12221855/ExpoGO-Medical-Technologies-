import React, { useEffect, useState } from 'react';

function Orders({ onClose }) {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'ordersOverlay') {
      onClose();
    }
  };

  return (
    <div
      id="ordersOverlay"
      onClick={handleBackgroundClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          width: '700px',
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '20px',
            background: 'none',
            border: 'none',
              cursor: 'url(/cursor.cur), default',  
          }}
        >
          ❌
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🛒 My Orders</h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '15px', paddingBottom: '10px' }}>
              <p><strong>Order #{index + 1}</strong> • Placed on {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total Price:</strong> {order.totalPrice}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} - {item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
