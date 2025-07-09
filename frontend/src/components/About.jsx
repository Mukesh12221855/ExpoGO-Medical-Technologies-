import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, easing: 'ease-in-out',  });
  }, []);

  return (
    <section id="about" style={styles.aboutSection}>
      <h2 data-aos="fade-right" style={styles.heading}>About Us</h2>

      <div style={styles.cardsContainer}>
        
        {/* Mission */}
        <div data-aos="fade-up" style={styles.card}>
          <img src="https://cdn-icons-png.flaticon.com/512/864/864685.png" alt="Mission" style={styles.icon} />
          <h3 style={styles.cardTitle}>Our Mission</h3>
          <p style={styles.cardDescription}>
            To develop and deliver cost-effective critical-care medical equipment,
            making advanced healthcare accessible to every corner of the world.
          </p>
        </div>

        {/* Vision */}
        <div data-aos="fade-up" style={styles.card}>
          <img src="https://cdn-icons-png.flaticon.com/512/2920/2920050.png" alt="Vision" style={styles.icon} />
          <h3 style={styles.cardTitle}>Our Vision</h3>
          <p style={styles.cardDescription}>
            To be the leading provider of affordable healthcare technology,
            empowering hospitals and clinics in emerging markets.
          </p>
        </div>

      </div>
    </section>
  );
}

const styles = {
  aboutSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    fontFamily: "'Poppins', sans-serif",
    padding: '80px 20px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#188754',
    marginBottom: '40px',
    textAlign: 'center',
  },
  cardsContainer: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '280px',
    backgroundColor: '#f0fdf4',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  icon: {
    width: '60px',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#188754',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '16px',
    color: '#555',
  },
};

export default About;
