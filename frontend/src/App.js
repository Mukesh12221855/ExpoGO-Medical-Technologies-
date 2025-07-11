import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Services from './components/Services';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Orders from './components/Orders';
import AdminDashboard from './components/AdminDashboard';

const stripePromise = loadStripe('pk_test_51QNYl4P3jAltl3mmmPR8Zs2X6bLwIPhUfYSPEdHCwQ4ABQRNnXVVM7AaSyMMrVFCpB5KxSsw7E40Pn1sVizLBbXq00fyhJ9BOK');

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const userData = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar
                  openLogin={() => setIsLoginOpen(true)}
                  openRegister={() => setIsRegisterOpen(true)}
                  isLoggedIn={isLoggedIn}
                  onProfile={() => {
                    setIsProfileOpen(true);
                    setIsOrdersOpen(false);
                  }}
                  onOrders={() => {
                    setIsOrdersOpen(true);
                    setIsProfileOpen(false);
                  }}
                  onLogout={() => {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    setIsLoggedIn(false);
                    setIsProfileOpen(false);
                    setIsOrdersOpen(false);
                  }}
                />

                <Home />
                <About />
                <Products openLogin={() => setIsLoginOpen(true)} />
                <Inventory />
                <Services />
                <Contact />
{isLoginOpen && (
  <Login
    onClose={() => setIsLoginOpen(false)}
    onLogin={() => setIsLoggedIn(true)}
    openRegister={() => {
      setIsLoginOpen(false);    // Close Login
      setIsRegisterOpen(true);  // Open Register
    }}
  />
)}

               {isRegisterOpen && (
  <Register
    onClose={() => setIsRegisterOpen(false)}
    onRegister={() => setIsLoggedIn(true)}
    openLogin={() => {
      setIsRegisterOpen(false);
      setIsLoginOpen(true);
    }}
  />
)}

                {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)} />}
                {isOrdersOpen && <Orders onClose={() => setIsOrdersOpen(false)} />}
              </div>
            }
          />

          <Route
            path="/admin"
            element={
              userData && userData.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;

