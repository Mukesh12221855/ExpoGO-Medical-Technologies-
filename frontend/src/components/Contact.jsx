import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
  useEffect(() => {
    AOS.init({
  duration: 1000,
  once: false,        // Allow animation on every scroll
  mirror: true,       // Animate when scrolling up
  easing: 'ease-in-out',  // Smooth easing
});
  }, []);

  return (
    <section id="contact" style={styles.contactSection}>
      <h2 data-aos="fade-up" style={styles.heading}>Contact Us</h2>

      {/* Address Info */}
      <div data-aos="fade-right" style={styles.infoBox}>
        <p><strong>ExpoGo Medical Technologies</strong></p>
        <p>Plot No 56, Hi-Tech Industrial Park, Hyderabad, Telangana, India - 500081</p>
        <p>Email: contact@expoGomedical.com</p>
        <p>Phone: +91 8885521845</p>
      </div>

      {/* Form-like Box */}
      <div data-aos="fade-left" style={styles.formBox}>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea placeholder="Your Message" style={{ ...styles.input, height: '100px' }}></textarea>
        <button style={styles.button}>Send Message</button>
      </div>

      {/* Google Maps Image */}
      <div data-aos="zoom-in" style={styles.mapBox}>
        <a href="https://www.google.com/maps/place/Hyderabad" target="_blank" rel="noopener noreferrer">
          <img src="map-address.jpg" alt="Google Maps" style={styles.mapImage} />
        </a>
      </div>
    </section>
  );
}

const styles = {
  contactSection: {
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
    marginBottom: '30px',
  },
  infoBox: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '30px',
    fontSize: '16px',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '300px',
    marginBottom: '30px',
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#188754',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '6px',
    border: 'none',
     cursor: 'url(/cursor.cur), default', 
  },
  mapBox: {
    marginTop: '20px',
  },
  mapImage: {
    width: '600px',
    height: '300px',
   cursor: 'url(/cursor.cur), default', 
  },
};

export default Contact;
