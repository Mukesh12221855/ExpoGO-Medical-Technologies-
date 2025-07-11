// import React from 'react';
// import { Player } from '@lottiefiles/react-lottie-player';
// import deliveryAnimation from '../animations/delivery.json';


// function Checkout({ onClose, cartItems, calculateTotal }) {
//   // Close if clicking on the dark background
//   const handleBackgroundClick = (e) => {
//     if (e.target.id === 'checkout-overlay') {
//       onClose();
//     }
//   };
 
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({
//         items: cartItems,
//         totalPrice: calculateTotal(),
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert('✅ Order placed successfully!');
//       onClose();
//     } else {
//       alert('❌ Error: ' + data.message);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('❌ Network error!');
//   }
// };

//   return (
//     <div
//       id="checkout-overlay"
//       onClick={handleBackgroundClick}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '30px',
//           borderRadius: '12px',
//           width: '400px',
//           position: 'relative',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
//         }}
//       >
//         {/* ❌ Close Button */}
//         <button
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             fontSize: '20px',
//             background: 'none',
//             border: 'none',
//              cursor: 'url(/cursor.cur), default', 
//           }}
//         >
//           ❌
//         </button>

//         <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Checkout</h2>
//         <p style={{ marginBottom: '20px', textAlign: 'center' }}>Thank you for choosing ExpoGo Medical Technologies.</p>
// <form onSubmit={handleSubmit}>
//   <input
//     type="text"
//     placeholder="Enter your name"
//     style={inputStyle}
//   />
//   <input
//     type="text"
//     placeholder="Enter your address"
//     style={inputStyle}
//   />
//   <button type="submit" style={buttonStyle}>
//     Place Order
//   </button>
// </form>

//       </div>
//     </div>
//   );
// }

// export default Checkout;

// const inputStyle = {
//   width: '100%',
//   marginBottom: '12px',
//   padding: '10px',
//   borderRadius: '5px',
//   border: '1px solid #ccc',
// };

// const buttonStyle = {
//   backgroundColor: '#007bff',
//   color: 'white',
//   padding: '10px 20px',
//   border: 'none',
//   borderRadius: '5px',
//    cursor: 'url(/cursor.cur), default', 
//   width: '100%',
// };

import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import deliveryAnimation from '../animations/delivery.json';

// ✅ Stripe Components
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Checkout({ onClose, cartItems, calculateTotal }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState('');
  const [stateName, setStateName] = useState('');
  const [isDelivering, setIsDelivering] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'checkout-overlay') {
      onClose();
    }
  };

  const handleStripePayment = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: calculateTotal() }),
    });

    const { clientSecret } = await response.json();

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name },
      },
    });

    if (paymentResult.error) {
      alert('❌ Payment failed: ' + paymentResult.error.message);
    } else {
      alert('✅ Payment Successful!');
      setIsDelivering(true);
      setTimeout(() => {
        setIsDelivering(false);
        onClose();
      }, 3000);
    }
  };

  if (isDelivering) {
    return (
      <div style={styles.overlayCenter}>
        <Player autoplay loop src={deliveryAnimation} style={{ height: '300px', width: '300px' }} />
        <h2 style={{ fontSize: '24px', marginTop: '20px' }}>Delivering your order...</h2>
      </div>
    );
  }

  return (
    <div id="checkout-overlay" onClick={handleBackgroundClick} style={styles.overlayDark}>
      <div style={styles.checkoutBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeButton}>❌</button>

        <h2 style={styles.heading}>Checkout</h2>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Building / Flat No." value={building} onChange={(e) => setBuilding(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} style={inputStyle} required />
            <button type="submit" style={buttonStyle}>Next</button>
          </form>
        )}

        {step === 2 && (
          <div>
            <h3>Order Summary</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cartItems.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', marginRight: '10px' }} />
                  <span>{item.name} - {item.quantity} × ₹{item.price}</span>
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{calculateTotal()}</p>
            <button onClick={() => setStep(3)} style={buttonStyle}>Go to Payment</button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleStripePayment}>
            <h3>Enter Card Details</h3>
            <div style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '12px' }}>
              <CardElement options={{ hidePostalCode: true }} />
            </div>
            <button type="submit" style={buttonStyle}>Pay Now</button>
          </form>
        )}

      </div>
    </div>
  );
}


export default Checkout;

// ✅ Styles for reuse
const styles = {
  overlayDark: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
  },
  overlayCenter: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', zIndex: 2000,
  },
  checkoutBox: {
    backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '400px', position: 'relative', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute', top: '10px', right: '10px', fontSize: '20px', background: 'none', border: 'none', cursor: 'url(/cursor.cur), default',
  },
  heading: {
    fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center',
  },
};

const inputStyle = {
  width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'url(/cursor.cur), default', width: '100%',
};
