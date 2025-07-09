import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ctScanMachine from '../assets/products/ctScanMachine.jpg';
import mriScanner from '../assets/products/mriScanner.jpg';
import patientMonitor from '../assets/products/patientMonitor.jpg';
import portableVentilator from '../assets/products/portableVentilator.jpg';
import Checkout from './Checkout';
import Cart from './Cart'; // ✅ Import the new Cart component

function Products() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
  }, []);

  // ✅ Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // ✅ Cart and Checkout States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // ✅ Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.name === product.name);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Product List
  const productList = [
    {
      name: 'CT Scan Machine',
      price: '₹ 1,50,000',
      image: ctScanMachine,
      category: 'Scanning',
      description: 'Advanced CT scan machine with high-resolution imaging for critical care diagnosis.',
    },
    {
      name: 'Portable Ventilator',
      price: '₹ 80,000',
      image: portableVentilator,
      category: 'Ventilators',
      description: 'Compact, portable ventilator for emergency and critical care units.',
    },
    {
      name: 'Patient Monitor',
      price: '₹ 45,000',
      image: patientMonitor,
      category: 'Monitoring',
      description: 'Multi-parameter patient monitor with ECG, SpO2, and NIBP monitoring.',
    },
    {
      name: 'MRI Scanner',
      price: '₹ 3,00,000',
      image: mriScanner,
      category: 'Scanning',
      description: 'High-field MRI scanner designed for advanced diagnostic imaging.',
    },
  ];

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" style={styles.productsSection}>
      <h2 data-aos="fade-up" style={styles.heading}>Our Products</h2>

      <div style={styles.cartBar} data-aos="fade-up">
        <button style={styles.cartIcon} onClick={() => setIsCartOpen(!isCartOpen)}> 🛒 Cart ({cart.length})</button>
        <button style={styles.checkoutIcon} onClick={() => setIsCheckoutOpen(true)}>💳 Checkout</button>
      </div>

      {isCheckoutOpen && <Checkout onClose={() => setIsCheckoutOpen(false)} />}
      {isCartOpen && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setIsCartOpen(false)}
          onCheckoutClick={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      <p data-aos="fade-up" style={styles.description}>
        Explore our wide range of critical-care medical equipment.
      </p>

      <div style={styles.searchFilterWrapper} data-aos="fade-up">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.filterDropdown}
        >
          <option value="">All Categories</option>
          <option value="Scanning">Scanning</option>
          <option value="Ventilators">Ventilators</option>
          <option value="Monitoring">Monitoring</option>
        </select>
      </div>

      <div style={styles.productsWrapper} data-aos="fade-up">
        {filteredProducts.map((product, index) => (
          <div key={index} style={styles.productCard}>
            <img src={product.image} alt={product.name} style={styles.productImage} />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productDesc}>{product.description}</p>
            <p style={styles.productCategory}>Category: {product.category}</p>
            <p style={styles.productPrice}>{product.price}</p>
            <div style={styles.buttonGroup}>
              <button style={styles.addToCartButton} onClick={() => addToCart(product)}> 🛒 Add to Cart</button>
              <button style={styles.buyNowButton}>🛍️ Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Keep your existing styles below

const styles = {
  productsSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    fontFamily: "'Poppins', sans-serif",
    padding: '80px 20px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#188754',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    maxWidth: '800px',
    textAlign: 'center',
  },
  searchFilterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '40px',
    flexWrap: 'wrap', // Responsive wrapping
  },
  searchInput: {
    padding: '12px 20px',
    borderRadius: '30px',
    border: '1px solid #ccc',
    width: '280px',
    outline: 'none',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  filterDropdown: {
    padding: '12px 20px',
    borderRadius: '30px',
    border: '1px solid #ccc',
    width: '220px',
    outline: 'none',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  productsWrapper: {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '24px',
  marginTop: '40px',
},

productCard: {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '260px',
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s',
},

productImage: {
  width: '100%',
  height: '160px',
  objectFit: 'contain',
  marginBottom: '16px',
},

productName: {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '8px',
},

productDesc: {
  fontSize: '14px',
  color: '#666',
  marginBottom: '8px',
},

productCategory: {
  fontSize: '14px',
  color: '#1D4ED8',
  marginBottom: '4px',
},

productPrice: {
  fontSize: '16px',
  color: '#16A34A',
  fontWeight: '700',
},
buttonGroup: {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '10px',
},

addToCartButton: {
  backgroundColor: '#3CB371',
  color: '#fff',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s',
},

buyNowButton: {
  backgroundColor: '#2E8B57',
  color: '#fff',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s',
},
cartBar: {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
  width: '100%',
  maxWidth: '1200px',
  marginTop: '20px',
},

cartIcon: {
  backgroundColor: '#facc15', // Yellow shade
  color: '#000',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
},

checkoutIcon: {
  backgroundColor: '#10b981', // Green shade
  color: '#fff',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
},

cartSidebar: {
  position: 'fixed',
  top: 0,
  right: '-400px',
  width: '320px',
  height: '100vh',
  backgroundColor: '#fff',
  boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
  transition: 'right 0.3s',
  padding: '20px',
  overflowY: 'auto',
  zIndex: 100,
},

cartTitle: {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
},

emptyCartText: {
  color: '#555',
  fontSize: '14px',
},

cartItemList: {
  listStyle: 'none',
  padding: 0,
  margin: 0,
},

cartItem: {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  gap: '10px',
},

cartItemImage: {
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  borderRadius: '6px',
},

cartItemName: {
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '4px',
},

cartItemPrice: {
  fontSize: '12px',
  color: '#16A34A',
},

removeButton: {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  marginLeft: 'auto',
},

quantityControls: {
  display: 'flex',
  alignItems: 'center',
  marginTop: '8px',
},

quantityButton: {
  padding: '4px 8px',
  fontSize: '14px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '4px',
  margin: '0 5px',
  backgroundColor: '#f0f0f0',
},

quantityText: {
  fontSize: '14px',
  minWidth: '20px',
  textAlign: 'center',
},

};

export default Products;
