import React,{useEffect} from 'react';



function Navbar({openLogin, openRegister, isLoggedIn,onProfile, onOrders, onLogout}) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

// ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav style={styles.navbar}>
      {/* Left: Logo */}
      <a href="#home" style={{ textDecoration: 'none' }}>
        <div style={styles.logoBox}>
          <img src="/expo.ico" alt="Doctor Icon" style={styles.logoImage} />
          <span style={styles.logoText}>ExpoGo Medical Technologies</span>
        </div>
      </a>

      {/* Middle: Nav Links */}
      <ul style={styles.navLinks}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#about" style={styles.link}>About</a></li>
        <li><a href="#products" style={styles.link}>Products</a></li>
        <li><a href="#inventory" style={styles.link}>Inventory</a></li>
        <li><a href="#services" style={styles.link}>Services</a></li>
        <li><a href="#contact" style={styles.link}>Contact</a></li>
      </ul>

      {/* Right: Login/Register OR Profile */}
      <div style={styles.authBox}>
        {isLoggedIn ? (
          <div className="profile-dropdown" style={styles.profileMenuContainer}>
            <span onClick={toggleDropdown} style={styles.profileIcon}>👤</span>
         {/* dropdown menu */}
           {isDropdownOpen && (
  <div style={styles.dropdown}>
    <div style={styles.dropdownItem} onClick={() => { onProfile(); setIsDropdownOpen(false); }}>Profile</div>
    <div style={styles.dropdownItem} onClick={() => { onOrders(); setIsDropdownOpen(false); }}>Orders</div>
    <div style={styles.dropdownItem} onClick={() => { onLogout(); setIsDropdownOpen(false); }}>Logout</div>
  </div>
)}

          </div>
        ) : (
          <>
            <button onClick={openLogin} style={styles.authLink}>Login</button>
            <button onClick={openRegister} style={styles.authLink}>Register</button>
          </>
        )}
      </div>
    </nav>
  );

}

const styles = {
  navbar: {
  display: 'flex',
  justifyContent: 'space-between',  // ✅ This evenly separates left, center, right
  alignItems: 'center',
  padding: '12px 40px 12px 20px',   //top right bottom left
  backgroundColor: '#f9f9f9',
  color: '#333',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  fontFamily: "'Poppins', sans-serif",
},
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#188754',
    padding: '6px 14px',
    borderRadius: '10px',
  },
  logoImage: {
    width: '32px',
    height: '32px',
  },
 logoText: {
    fontSize: '20px',
    fontWeight: 700,  // Bolder logo
    color: '#fff',
    fontFamily: "'Poppins', sans-serif",
  },

 navLinks: {
  listStyle: 'none',
  display: 'flex',
  gap: '35px',
  margin: 0,
  padding: 0,
},
  link: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
   // ✅ New Auth Box styles
  authBox: {
    display: 'flex',
    gap: '10px',
    backgroundColor: '#0d6efd',
    padding: '12px 40px 12px 20px',
    borderRadius: '10px',
  },
  authLink: {
    color: '#fff',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  profileMenu: {
  position: 'relative',
  cursor: 'pointer',
},

profileIcon: {
  fontSize: '22px',
  color: '#fff',
  cursor: 'pointer'
},
profileMenuContainer: {
  position: 'relative',
},

dropdown: {
  position: 'absolute',
  top: '30px',
  right: 0,
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '8px 0',
  zIndex: 1000,
  minWidth: '130px',
},

dropdownItem: {
  padding: '8px 16px',
  cursor: 'pointer',
  color: '#333',
},


};

export default Navbar;
