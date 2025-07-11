import React, { useState } from 'react';

function Login({onClose, onLogin, openRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 // ✅ Close on background click
  const handleBackgroundClick = (e) => {
    if (e.target.id === 'loginOverlay') {
      onClose();
    }
  };

  //login -handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Login successful!');
        // ✅ Save the token to localStorage (or context)
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));

        onClose(); // Close the login overlay
        onLogin();
        
  if (data.user.role === 'admin') {
    window.open('/admin', '_blank'); // 👈 Open admin in new tab
  } else {
    onLogin(); // Normal user login flow
    onClose();
  }
      } else {
        alert('❌ Error: ' + data.message);
      }
       if (data.message === 'User not found') {
    onClose();        // Close Login
    openRegister();   // Open Register
  }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Network error!');
    }
  };

  return (
    <div
      id="loginOverlay"
      onClick={handleBackgroundClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // ✅ Prevent close when clicking inside
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          width: '400px',
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

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
  Don't have an account? <span onClick={() => { onClose(); openRegister(); }} style={{ color: '#0d6efd', cursor: 'pointer' }}>Register</span>
</p>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  marginBottom: '12px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#0d6efd',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
   cursor: 'url(/cursor.cur), default', 
};

export default Login;
