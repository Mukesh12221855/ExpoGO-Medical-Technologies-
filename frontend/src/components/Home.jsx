import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import molecule from '../assets/molecule.jpg'

function Home() {

  //image-effect 
   const [bgVisible, setBgVisible] = useState(false);
   //image-effect 
   const [isHoveredCEO1, setIsHoveredCEO1] = useState(false);
   const [isHoveredCEO2, setIsHoveredCEO2] = useState(false);


   //aos-animation
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, easing: 'ease-in-out', });
  }, []);

  return (
    <section
      id="home"
      style={{
        ...styles.homeSection,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setBgVisible(true)}
      onMouseLeave={() => setBgVisible(false)}
    >
  {/* Background image layer */}
      <div
        style={{
          ...styles.backgroundImage,
          opacity: bgVisible ? 0.1 : 0,  //transperent effect
        }}
      ></div>

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
          <img src="/nav.ico" alt="CEO" style={{...styles.ceoImage,transform: isHoveredCEO1 ? 'scale(1.3)' : 'scale(1)' }}
          onMouseEnter={() => setIsHoveredCEO1(true)}
          onMouseLeave={() => setIsHoveredCEO1(false)}
          />
          
          <p style={styles.ceoName}><strong>Dr. Chandana Mukesh</strong></p>
          <p style={styles.ceoBio}>Founder & CEO, ExpoGo Medical Technologies</p>
        </div>

        <div data-aos="fade-left" style={styles.rightContent}>
          <img src="/nav2.ico" alt="CEO" style={{...styles.ceoImage,transform: isHoveredCEO2 ? 'scale(1.3)' : 'scale(1)' }}
          onMouseEnter={() => setIsHoveredCEO2(true)}
          onMouseLeave={() => setIsHoveredCEO2(false)}
          />
          
          <p style={styles.ceoName}><strong>Dr. Vishnum Naidu Babbodhi</strong></p>
          <p style={styles.ceoBio}>Chairman, ExpoGo Medical Technologies</p>
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
  backgroundImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    backgroundImage: `url(${molecule})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1.5s ease',
    zIndex: 0,
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
    color: '#000',
    marginBottom: '10px',
  },
  shortIntro: {
    fontSize: '16px',
    color: '#000',
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
    transition: 'transform 0.5s ease',
  },

  ceoName: {
    fontSize: '18px',
    color: '#000',
  },
  ceoBio: {
    fontSize: '14px',
    color: '#000',
    textAlign: 'center',
  },
  centerDescription: {
    maxWidth: '800px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    color: '#000',
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
