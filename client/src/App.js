import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home.js'
import Login from './Login.js';
import Navbar from './Navbar.js'
import Footer from './Footer.js'
import Sidebar from './Sidebar.js';
import Slider from './Slider.js';
function App() {
    




    return (
        <div>
     <Navbar/>
     <Slider/>
     <Sidebar/>
    
     <Routes>

        <Route exact path='/' element={ <Home/>}/>
       
        <Route exact path='/Login' element={ <Login/>}/>


     </Routes>

     <Footer/>
        </div>

     
   
    );
}

export default App;
