import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, easing: 'ease-in-out', });
  }, []);

  return (
    <section id="home" style={styles.homeSection}>

      {/* Top Row: Logo & CEO */}
      <div style={styles.topRow}>
        {/* Left Side: Logo + Text */}
        <div data-aos="fade-right" style={styles.leftContent}>
          <img src="/expo.ico" alt="Doctor Icon" style={styles.logoImage} />
          <div style={styles.textBox}>
            <h1 style={styles.companyName}>ExpoGo Medical Technologies</h1>
            <p style={styles.shortIntro}>
              Revolutionizing critical-care medical equipment for emerging healthcare markets.
            </p>
          </div>
        </div>

        {/* Right Side: CEO Info */}
        <div data-aos="fade-left" style={styles.rightContent}>
          <img src="/nav.ico" alt="CEO" style={styles.ceoImage} />
          <p style={styles.ceoName}><strong>Dr. Chandana Mukesh</strong></p>
          <p style={styles.ceoBio}>Founder & CEO, ExpoGo Medical Technologies</p>
        </div>
      </div>

      {/* Center Description */}
      <div data-aos="fade-up" style={styles.centerDescription}>
        <p style={styles.description}>
          At ExpoGo Medical Technologies, we aim to make advanced medical care accessible and affordable for healthcare providers worldwide. 
          Our mission is to bridge the gap in healthcare delivery with sustainable, reliable, and cost-effective critical-care equipment.
        </p>
      </div>

      {/* Button */}
      <a data-aos="zoom-in" href="#products" style={styles.button}>Explore Products</a>
    </section>
  );
}

const styles = {
  homeSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '80px',
    backgroundColor: '#f0fdf4',
    fontFamily: "'Poppins', sans-serif",
    padding: '80px 20px',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  logoImage: {
    width: '200px',
    height: '200px',
    borderRadius: '12px',
  },
  textBox: {
    maxWidth: '400px',
  },
  companyName: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#188754',
    marginBottom: '10px',
  },
  shortIntro: {
    fontSize: '16px',
    color: '#555',
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  ceoImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  ceoName: {
    fontSize: '18px',
    color: '#188754',
  },
  ceoBio: {
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
  },
  centerDescription: {
    maxWidth: '800px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    color: '#555',
  },
  button: {
    backgroundColor: '#188754',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;
