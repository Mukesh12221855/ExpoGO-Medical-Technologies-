


import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import packingAnimation from '../animations/packing.json'; // Adjust the path


function Cart({ cart, setCart, onClose, onCheckoutClick,openLogin }) {
  // ✅ Existing state
  const [isPacking, setIsPacking] = useState(false);  // ✅ Added packing state

  // ✅ Packing Animation Handling
    const handleCheckout = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please log in to proceed to checkout.');
      openLogin();
      return;
    }

    setIsPacking(true);
    setTimeout(() => {
      setIsPacking(false);
      onCheckoutClick();
    }, 3000);
  };

  // ✅ Background click handler remains the same
  const handleBackgroundClick = (e) => {
    if (e.target.id === 'cartOverlay') {
      onClose();
    }
  };

  // ✅ Packing animation overlay
  if (isPacking) {
  return (
    <div>
      <Player
        autoplay
        loop
        src={packingAnimation}
        style={{ height: '300px', width: '300px' }}
      />
      <h2 >
        Packing your order...
      </h2>
    </div>
  );
}


  // ✅ Existing return unchanged
  return (
    <div id="cartOverlay" onClick={handleBackgroundClick} style={styles.overlay}>

      <div
        
        onClick={(e) => e.stopPropagation()} style={styles.cartBox} // ⛔️ Prevent background click from closing when clicking inside cart
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={styles.closeButton}
        >
          ❌
        </button>

        <h3 style={styles.heading} >🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item, index) => (
              <li key={index} style={styles.cartItem}>
                <p style={styles.itemName}>{item.name} - {item.price}</p>
                <div>
                  <button onClick={() => decreaseQuantity(item.name, setCart)}>➖</button>
                  <span >{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.name, setCart)}>➕</button>
                  <button onClick={() => removeFromCart(index, setCart)}>🚮</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <button
            onClick={handleCheckout}  // ✅ Call packing first, then checkout
             style={styles.checkoutButton}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}

// ✅ Helper functions unchanged
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

const styles = {
  overlay: {
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
  },
  cartBox: {
    backgroundColor: '#ffffff',
    width: '400px',
    height: '100%',
    padding: '20px',
    position: 'relative',
    boxShadow: '-2px 0 12px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'url(/cursor.cur), default',
    transition: 'color 0.3s',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#333',
  },
  cartItem: {
    borderBottom: '1px solid #eee',
    paddingBottom: '12px',
    marginBottom: '12px',
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#222',
    marginBottom: '8px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '50%',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  checkoutButton: {
    marginTop: '20px',
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'url(/cursor.cur), default',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
};
