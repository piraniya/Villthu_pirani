import heroImage from '../assets/img/turmeric.jpg';
import seedsImage from '../assets/img/21.webp';
import fragranceImage from '../assets/img/cook.jpg';
import Image from '../assets/img/cocunt.jpg';
import topImage from '../assets/img/21.webp';
import newImage from '../assets/img/ghee.jpg';

const Product = () => {
    return (
        <section class="products container" id="products">
         {/* Heading  */}
        <div class="heading">
          <h2>Our Top Selling Products</h2>
          <p>
            It takes a lot of heart and hard work at every step to create the best
            coffee possible, and we know it takes a lot of grit to keep your own
            grind going.
          </p>
        </div>
  
         {/* Products  */}
        <div class="product_content">
           {/* Box 1  */}
          <div class="product_box">
            <i class="bx bx-heart heart_icon"></i>
            <img src={heroImage} alt="images" className="home_img" />
            <p>Home product</p>
            <h2>Turmeric</h2>
            <div class="product_info">
              <span>₹ 500</span>
              <i class="bx bx-shopping-bag"></i>
            </div>
          </div>
           {/* Box 2  */}
          <div class="product_box">
            <i class="bx bx-heart heart_icon"></i>
            <img src={seedsImage} alt="images" className="home_img" />
            <p>Home product</p>
            <h2>Alovera</h2>
            <div class="product_info">
              <span>₹ 500</span>
              <i class="bx bx-shopping-bag"></i>
            </div>
          </div>
           {/* Box 3  */}
          <div class="product_box">
            <i class="bx bx-heart heart_icon"></i>
            <img src={fragranceImage} alt="images" className="home_img" />
            <p>Home product</p>
            <h2>Spices</h2>
            <div class="product_info">
              <span>₹ 500</span>
              <i class="bx bx-shopping-bag"></i>
            </div>
          </div>
           {/* Box 4  */}
          <div class="product_box">
            <i class="bx bx-heart heart_icon"></i>
            <img src={Image} alt="images" className="home_img" />
            <p>Home product</p>
            <h2>Cocunt oil</h2>
            <div class="product_info">
              <span>₹ 500</span>
              <i class="bx bx-shopping-bag"></i>
            </div>
          </div>
           {/* Box 5  */}
          <div class="product_box">
            <i class="bx bx-heart heart_icon"></i>
            <img src={topImage} alt="images" className="home_img" />
            <p>Home product</p>
            <h2>Alovera</h2>
            <div class="product_info">
              <span>₹ 500</span>
              <i class="bx bx-shopping-bag"></i>
            </div>
          </div>
           {/* Box 6  */}
          <div class="product_box">
            <i class="bx bx-heart heart_icon"></i>
            <img src={newImage} alt="images" className="home_img" />
            <p>Home product</p>
            <h2>ghee</h2>
            <div class="product_info">
              <span>₹ 500</span>
              <i class="bx bx-shopping-bag"></i>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Product;
