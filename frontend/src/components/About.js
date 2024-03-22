import '../assets/css/style.css'
import React from 'react';
import heroImage from '../assets/img/hero.png';
import { Link } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import '../components/Product'
import '../components/Footer'
import '../components/Header'
import Header from '../components/Header';
import Product from '../components/Product';
import Footer from '../components/Footer';
import { useEffect } from "react";

const About = () => {
  

 
  return (
     
    
    
    <>
    
    
    <section className="home container" id="home">
      <div className="home_text">
        <h1>
        It’s grown by nature <br/> and served by nature 
          
        </h1>
        <p>
        A society grows great when old men plant trees whose shade they know they shall never sit in.
        </p>
      <Link to="/PlantCard">  <a href="#" className="bit">
          <span>Soil type</span>
          <i className="bx bx-up-arrow-alt"></i>
        </a>   </Link>
      </div>
      {/* Home Image */}
      <img src={heroImage} alt="images" className="home_img" />
    </section>

<Product /></>

  );
};

export default About;