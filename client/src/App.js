import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home.js'
import Navbar from './Navbar.js'
import Footer from './Footer.js'
function App() {
    




    return (
        <div>
     <Navbar/>
     
     <Routes>

        <Route exact path='/' element={ <Home/>}/>

     </Routes>

     <Footer/>
        </div>

     
   
    );
}

export default App;
