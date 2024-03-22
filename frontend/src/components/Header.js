import React, { useContext, useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart,faSignOutAlt,  faSeedling } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css'; 


const Header = ({cartItems}) => {
  const [user,setUser] = useState(null);
  const iconStyle = { color: '#f8e4be' };
  const newStyle = {color: '#df582e'}
   // Accessing cart from CartContext

  const email = localStorage.getItem("email");
  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch(`http://localhost:4008/api/v1/users/${email}`);
              const data = await response.json();
              console.log(data)
              if (data.success) {
                  localStorage.setItem("userId", data.response._id);
                  setUser(data.response);
              } else {
                  console.log("User not found");
              }
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      };
      fetchUserData();
  }, [email]);
  const handleLogout = () => {
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      window.location.reload();
  };



  return (
    <header>
      <div className="nav container">
        <a href="home" className="logo">Viluthu</a>
        <div className="navbar">
          <a href="home" className="nav_link">Home</a>
          <a href="product" className="nav_link">Products</a>
          <a href="PlantCard" className="nav_link">Plants</a>
          <a href="fertilizer" className="nav_link">Fertilizer</a>
          {/* <a href="#review" className="nav_link">Reviews</a> */}
        </div>

        <div className="fontas">
          <div className="d-none d-lg-flex ms-2">
             {/* <a className="-sm-square rounded- ms-3" href="/login" onClick={myFunction}>
              <FontAwesomeIcon icon={faUser} style={iconStyle} />
            </a>  */}
            <Link to={"/cart" } > <a href="/cart" className="btn-sm-square rounded-circle ms-3">
              <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
              <span className="cart-number ml-1" id="cart_count">{Array.isArray(cartItems) ? cartItems.length : 0}</span>
            </a> </Link>



            {user && user.isAdmin === "true" && (
                                        <a href="/admin/*" className=""  style={newStyle}
                                            // '--bs-btn-padding-y': '.85rem',
                                            // '--bs-btn-padding-x': '.85rem',
                                            // '--bs-btn-font-size': '1.5rem',
                                         > <FontAwesomeIcon icon={ faSeedling } style={iconStyle}/>A</a>
                                    )}
                                    {email ? (<a className="-sm-square header-btn ms-3" href="/login" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} />
                                        </a>
                                    ) : (<a className="-sm-square header-btn ms-3" href="/login" onClick={myFunction}>
                                      <FontAwesomeIcon icon={faUser} style={iconStyle} />
                                      </a>)}
          </div>
        </div>
      </div>
    </header>

  );
}

function myFunction() {
  alert('Login button was clicked!');
}

export default Header;


