import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import mri from '../assets/inventory/mri.jpg';
import monitor from '../assets/inventory/monitor.jpg';
import pump from '../assets/inventory/pump.jpg';
import ventilator from '../assets/inventory/ventilator.jpg';
function Inventory() {
  useEffect(() => {
    AOS.init({
  duration: 1000,
  once: false,        // Allow animation on every scroll
  mirror: true,       // Animate when scrolling up
  easing: 'ease-in-out',  // Smooth easing
});
  }, []);


  const [filterStatus, setFilterStatus] = useState('All');

const technologies = [
  {
    id: 1,
    name: 'Advanced MRI Scanner',
    description: 'Faster imaging and AI-based automatic diagnostics for brain and spine disorders.',
    status: 'Under Development',
    image: mri,
  },
  {
    id: 2,
    name: 'Compact Ventilator V2',
    description: 'Lightweight design and improved battery life for mobile emergency care.',
    status: 'Prototype Ready',
    image: ventilator,
  },
  {
    id: 3,
    name: 'Wireless Patient Monitor',
    description: 'Tracks patient vitals and syncs with cloud-based hospital systems.',
    status: 'Research Phase',
    image: monitor,
  },
  {
    id: 4,
    name: 'Smart Infusion Pump',
    description: 'Automated drug delivery with IoT monitoring and safety alarms.',
    status: 'Coming Soon',
    image: pump,
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Under Development':
      return { backgroundColor: '#fef08a', color: '#854d0e' };
    case 'Prototype Ready':
      return { backgroundColor: '#bbf7d0', color: '#166534' };
    case 'Research Phase':
      return { backgroundColor: '#bfdbfe', color: '#1e3a8a' };
    case 'Coming Soon':
      return { backgroundColor: '#e9d5ff', color: '#6b21a8' };
    default:
      return { backgroundColor: '#e5e7eb', color: '#374151' };
  }
};




  return (
    <section id="inventory" style={styles.inventorySection}>
      <h2 data-aos="fade-right" style={styles.heading}>Inventory Management</h2>
      <p data-aos="fade-left" style={styles.description}>
        Manage and track your medical equipment inventory with ease.  
        Our inventory system helps hospitals and clinics keep their stock updated, ensuring timely availability of critical-care devices.
      </p>
    <div style={{ marginTop: '30px', marginBottom: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
  <button onClick={() => setFilterStatus('Under Development')} style={{ ...styles.filterButton, backgroundColor: '#fef08a', color: '#854d0e' }}> Under Development</button>
  <button onClick={() => setFilterStatus('Prototype Ready')}style={{ ...styles.filterButton, backgroundColor: '#bbf7d0', color: '#166534' }}>Prototype Ready</button>
  <button onClick={() => setFilterStatus('Research Phase')} style={{ ...styles.filterButton, backgroundColor: '#bfdbfe', color: '#1e3a8a' }}> Research Phase</button>
  <button onClick={() => setFilterStatus('Coming Soon')}style={{ ...styles.filterButton, backgroundColor: '#e9d5ff', color: '#6b21a8' }}>Coming Soon</button>
  <button onClick={() => setFilterStatus('All')}style={{ ...styles.filterButton, backgroundColor: '#e0e0e0', color: '#333' }}>Show All</button>
</div>


<div style={styles.cardContainer}>
 {technologies
  .filter((tech) => filterStatus === 'All' || tech.status === filterStatus)
  .map((tech) => (

    <div key={tech.id} style={styles.card} data-aos="zoom-in">
      <img
        src={tech.image}
        alt={tech.name}
        style={styles.image}
      />
      <h3 style={styles.cardTitle}>{tech.name}</h3>
      <p style={styles.cardDescription}>{tech.description}</p>
      <span style={{ ...styles.statusBadge, ...getStatusStyle(tech.status) }}>
        {tech.status}
      </span>
    </div>
  ))}
</div>


    </section>
  );
}

const styles = {
  inventorySection: {
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
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    maxWidth: '800px',
    textAlign: 'center',
  },
  
 cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
  },
  card: {
    width: '700px',
    height: '600px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  
  filterButton: {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '20px',
  backgroundColor: '#188754',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'background-color 0.3s',
},

  
};

export default Inventory;
