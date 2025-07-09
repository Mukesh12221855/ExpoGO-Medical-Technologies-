import React,{useState} from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Services from './components/Services';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Profile  from './components/Profile';
import Orders from './components/Orders';


function App() {
  // const [currentPage, setCurrentPage] = useState('home'); // 👈 default is home
 const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isRegisterOpen, setIsRegisterOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false); //profile-order
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // return (
  //   <div>
  //     <Navbar setCurrentPage={setCurrentPage} />
      
  //     {/* Conditionally render based on currentPage */}
  //     {currentPage === 'home' && (
  //       <>
        
  //         <Home />
  //         <About />
  //         <Products />
  //         <Inventory />
  //         <Services />
  //         <Contact />
  //       </>
  //     )}

  //     {currentPage === 'login' && <Login />}
  //     {currentPage === 'register' && <Register />}
  //   </div>
  // );
  return (
    <div>
      {/* ✅ Pass open/close handlers to Navbar */}
 <Navbar
  openLogin={() => setIsLoginOpen(true)}
  openRegister={() => setIsRegisterOpen(true)}
  isLoggedIn={isLoggedIn}
  onProfile={() => {
          setIsProfileOpen(true);
          setIsOrdersOpen(false);
        }}
        onOrders={() => {
          setIsOrdersOpen(true);
          setIsProfileOpen(false);
        }}
  onLogout={() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
     setIsProfileOpen(false);
          setIsOrdersOpen(false);
  }}
/>


      {/* ✅ Always show the main sections */}
      <Home />
      <About />
      <Products />
      <Inventory />
      <Services />
      <Contact />

      {/* ✅ Conditionally show popups */}
     {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} onLogin={() => setIsLoggedIn(true)} />}
{isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} onRegister={() => setIsLoggedIn(true)} />}

{isProfileOpen && (
        <Profile
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {isOrdersOpen && (
        <Orders
          onClose={() => setIsOrdersOpen(false)}
        />
      )}

    </div>
  );
}


export default App;
