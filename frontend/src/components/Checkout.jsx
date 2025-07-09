import React from 'react';

function Checkout({ onClose }) {
  // Close if clicking on the dark background
  const handleBackgroundClick = (e) => {
    if (e.target.id === 'checkout-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="checkout-overlay"
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
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          width: '400px',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ❌
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Checkout</h2>
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>Thank you for choosing ExpoGo Medical Technologies.</p>

        <form>
          <input
            type="text"
            placeholder="Enter your name"
            style={{
              width: '100%',
              marginBottom: '12px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            placeholder="Enter your address"
            style={{
              width: '100%',
              marginBottom: '12px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
