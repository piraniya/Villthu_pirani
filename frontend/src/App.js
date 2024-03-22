import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Product from './components/Product';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPannel from '../src/components/Admin/AdminPannel';
import Home from '../src/components/Home/Home';
import PlantCard from './components/Plant/PlantCard';
import PlantDeatils from './components/Plant/PlantDeatils';
import Fertilizer from './components/Plant/Fertilizer';
import FertilizerDetails from './components/Plant/FertilizerDeatils';

import Cart from './components/Cart'; 
import { useEffect } from "react";




function App() {

  const [cartItems, setCartItems] = useState([]);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
 

  useEffect(() => {
    // Check if the current route is an admin route
    setIsAdminRoute(window.location.pathname.startsWith('/admin'));
  }, []);
 
  return (
    <div>
      
        <Router>
        {!isAdminRoute && <Header cartItems={cartItems} />} 
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/PlantCard" element={<PlantCard />} />
            <Route path="/admin/*" element={<AdminPannel />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/plants/:id" element={<PlantDeatils />} />
            <Route path="/fertilizer" element={<Fertilizer />} />
            {/* <Route path="/fertilizers/:id" element={<FertilizerDetails />} /> */}
            <Route path='/viewdetails/:id' element={<FertilizerDetails cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
           
          </Routes>
          {!isAdminRoute && <Footer/> }
        </Router>
        
      
    </div>
  );
}

export default App;
