import { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.js';
import Login from './Login.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Sidebar from './Sidebar.js';
import Slider from './Slider.js';
import Profile from './Profile.js';
import Contact from './Contact.js';
import About from './About.js';

function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      
      {/* Render Slider and Sidebar only on the homepage */}
      {location.pathname === '/' && (
        <>
          <Slider />
      
        </>
        
      )}
          <Sidebar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Profile' element={<Profile />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path='/About' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
