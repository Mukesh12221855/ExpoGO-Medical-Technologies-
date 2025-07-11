import React, { useState } from 'react';

function Register({onClose, onRegister, openLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  // 'user' or 'admin'
  const [email, setEmail] = useState('');

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'registerOverlay') {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

     if (response.ok) {
  alert('✅ Registration successful! Please log in now.');
  onClose();    // Close Register
  openLogin();  // Open Login
} else {
        alert('❌ Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Network error!');
    }
  };

  return (
    <div
      id="registerOverlay"
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
        onClick={(e) => e.stopPropagation()}
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

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>

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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={buttonStyle}>Register</button>
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

export default Register;
