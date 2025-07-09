import React, { useState, useEffect } from 'react';

function Profile({ onClose }) {
  const [user, setUser] = useState({
    profilePic: '',
    name: '',
    email: '',
    username: '',
    mobile: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editPic, setEditPic] = useState('');

  // ✅ Load profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUser(data);
        setEditName(data.name || '');
        setEditMobile(data.mobile || '');
        setEditPic(data.profilePic || 'https://via.placeholder.com/100');
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Save edited profile to backend
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: editName,
          mobile: editMobile,
          profilePic: editPic,
        }),
      });

      const data = await response.json();
      setUser(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'profileOverlay') {
      onClose();
    }
  };

  return (
    <div
      id="profileOverlay"
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
          width: '600px',
          minHeight: '400px',
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
            cursor: 'pointer',
          }}
        >
          ❌
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>👤 My Profile</h2>

        {/* ✅ Profile Picture */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={editPic || 'https://via.placeholder.com/100'}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
          />

          {isEditing && (
            <>
              <button
                style={buttonStyle}
                onClick={() => document.getElementById('galleryPicker').click()}
              >
                Select from Gallery
              </button>
              <button
                style={buttonStyle}
                onClick={() => document.getElementById('cameraPicker').click()}
              >
                Take a Picture
              </button>

              <input
                type="file"
                accept="image/*"
                id="galleryPicker"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setEditPic(URL.createObjectURL(file));
                }}
              />

              <input
                type="file"
                accept="image/*"
                capture="environment"
                id="cameraPicker"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setEditPic(URL.createObjectURL(file));
                }}
              />
            </>
          )}
        </div>

        {/* ✅ Non-editable Fields */}
        <div style={{ marginBottom: '12px' }}>Username: <strong>{user.username}</strong></div>
        <div style={{ marginBottom: '12px' }}>Email: <strong>{user.email}</strong></div>

        {/* ✅ Editable Fields */}
        <div style={{ marginBottom: '12px' }}>
          Name:{' '}
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={inputStyle}
            />
          ) : (
            <strong>{user.name}</strong>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          Mobile:{' '}
          {isEditing ? (
            <input
              type="text"
              value={editMobile}
              onChange={(e) => setEditMobile(e.target.value)}
              style={inputStyle}
            />
          ) : (
            <strong>{user.mobile}</strong>
          )}
        </div>

        {/* ✅ Save/Edit Button */}
        {isEditing ? (
          <button onClick={handleSave} style={buttonStyle}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={buttonStyle}>Edit</button>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '70%',
};

const buttonStyle = {
  padding: '8px 14px',
  backgroundColor: '#0d6efd',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Profile;
