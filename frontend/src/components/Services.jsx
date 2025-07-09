import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Services() {
  useEffect(() => {
    AOS.init({
  duration: 1000,
  once: false,        // Allow animation on every scroll
  mirror: true,       // Animate when scrolling up
  easing: 'ease-in-out',  // Smooth easing
});
  }, []);

  return (
    <section id="services" style={styles.servicesSection}>
      <h2 data-aos="fade-up" style={styles.heading}>Our Services</h2>
      <p data-aos="fade-up" style={styles.description}>
        We offer installation, maintenance, and technical support for all our medical equipment.  
        Our expert team ensures that your devices are always functioning at their best, minimizing downtime and maximizing care.
      </p>
    </section>
  );
}

const styles = {
  servicesSection: {
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
};

export default Services;
