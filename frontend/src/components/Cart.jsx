import React from 'react';

function Cart({ cart, setCart, onClose, onCheckoutClick }) {
  // ✅ Close when clicking on the dark background
  const handleBackgroundClick = (e) => {
    if (e.target.id === 'cartOverlay') {
      onClose();
    }
  };

  return (
    <div
      id="cartOverlay"
      onClick={handleBackgroundClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          width: '400px',
          height: '100%',
          padding: '20px',
          position: 'relative',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()} // ⛔️ Prevent background click from closing when clicking inside cart
      >
        {/* Close Button */}
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

        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: '16px' }}>
                <p>{item.name} - {item.price}</p>
                <div>
                  <button onClick={() => decreaseQuantity(item.name, setCart)}>➖</button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.name, setCart)}>➕</button>
                  <button onClick={() => removeFromCart(index, setCart)}>🚮</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <button
            onClick={onCheckoutClick}
            style={{
              marginTop: '20px',
              backgroundColor: '#28a745',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}

// ✅ Move these helper functions inside the Cart file
function increaseQuantity(productName, setCart) {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
}

function decreaseQuantity(productName, setCart) {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

function removeFromCart(indexToRemove, setCart) {
  setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
}

export default Cart;
