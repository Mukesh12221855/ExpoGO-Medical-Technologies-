import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


// ✅ Step 1: Scroll Animation Keyframes
const keyframes = `
@keyframes scrollLeft {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}
`;


function About() {
  const [selectedBox, setSelectedBox] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, easing: 'ease-in-out',  });

      const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
  }, []);


   // ✅ Step 2: New Scrollable Boxes
  const scrollBoxes = [
    { title: 'Our Vision', content: 'To be the leading provider of affordable healthcare technology, empowering hospitals and clinics in emerging markets.' },
    { title: 'Our Mission', content: 'To develop and deliver cost-effective critical-care medical equipment, making advanced healthcare accessible to every corner of the world.' },
    { title: 'Our Team', content: 'Led by passionate healthcare engineers and clinical experts worldwide, dedicated to improving lives.' },
    { title: 'Our Values', content: 'Integrity, Affordability, Innovation, and putting patients first.' },
  ];


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


{/* ✅ Continuous Scrollable Boxes */}
      <div style={styles.scrollContainer}>
        {scrollBoxes.map((box, index) => (
          <div
            key={index}
            style={styles.scrollBox}
            onClick={() => setSelectedBox(box)}
          >
            <h3>{box.title}</h3>
          </div>
        ))}
      </div>

      {/* ✅ Click-to-open Transparent Modal */}
      {selectedBox && (
        <div
          onClick={() => setSelectedBox(null)}
          style={styles.overlay}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={styles.overlayContent}
          >
            <h2>{selectedBox.title}</h2>
            <p>{selectedBox.content}</p>
          </div>
        </div>
      )}

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
  scrollContainer: {
    display: 'flex',
    gap: '40px',
    whiteSpace: 'nowrap',
    animation: 'scrollLeft 30s linear infinite',
  },
  scrollBox: {
    minWidth: '250px',
    backgroundColor: '#188754',
    color: '#fff',
    padding: '20px',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '500px',
    color: 'white',
    textAlign: 'center',
    backdropFilter: 'blur(5px)',
  },

};

export default About;
