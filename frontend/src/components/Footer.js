import '../assets/css/style.css'
import React from 'react';

const Footer = () => {
  return (
    <section class="footer container">
    <div class="footer_box">
      <a href="#" class="logo">Viluthu</a>
      <div class="social">
        <a href="#"><i class="bx bxl-twitch"></i></a>
        <a href="#"><i class="bx bxl-twitter"></i></a>
        <a href="#"><i class="bx bxl-linkedin"></i></a>
        <a href="#"><i class="bx bxl-youtube"></i></a>
      </div>
    </div>

    <div class="footer_box">
      <h3>About</h3>
      <a href="#">SignUp</a>
      <a href="#">Login</a>
      <a href="#">Add To Cart</a>
    </div>

    <div class="footer_box">
      <h3>Customer's Resources</h3>
      <a href="#">Plants</a>
      <a href="#">Fertilizer</a>
      <a href="#">Reviews</a>
    </div>

    <div class="footer_box">
      <h3>Services</h3>
      <a href="#">Payment Options</a>
      <a href="#">Refund & Exchange</a>
      <a href="#">Limitation of liability</a>
    </div>

  </section>
  
  );
};

export default Footer;