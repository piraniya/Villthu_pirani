


// Import useState hook for managing state

// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faSeedling, faPrescriptionBottle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import '../Admin/AdminStyle.css'
// import logoImage from '/home/uki/Downloads/final/fronted/src/assets/img/admin.png'; 
// function AdminDashboard() {
//   return (
    
//       <div className="wrapper">
//         <nav id="sidebar">
//           <div className="sidebar-header">
//           <img src={logoImage} alt="Logo" className="logo-img" />
//             <h3>Piraniya</h3>
//           </div>
//           <ul className="list-unstyled components">
//             <li>
//               <Link to="/admin/user">
//                 <FontAwesomeIcon icon={faUser} /> User
//               </Link>
//             </li>
//             <li>
//               <Link to="/admin/plant">
//                 <FontAwesomeIcon icon={faSeedling} /> Plants
//               </Link>
//             </li>
//             <li>
//               <Link to="/admin">
//                 <FontAwesomeIcon icon={faPrescriptionBottle} /> Fertilizer
//               </Link>
//             </li>
//             <li>
              
//               <Link to="/admin/logout">
//                 <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//               </Link>
              
//             </li>
//           </ul>
//         </nav>

      
//         </div>
      
    
//   );
// }

// export default AdminDashboard;


import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSeedling, faPrescriptionBottle, faSignOutAlt, faComments } from '@fortawesome/free-solid-svg-icons'; // Added faComments for chat icon
import '../Admin/AdminStyle.css'
// import logoImage from '.'; 





function AdminDashboard() {

  const navigate = useNavigate(); // Hook to navigate between pages

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing local storage, removing tokens)
    // After logout, navigate to the home page
    navigate('/');}
  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          
          <h3></h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/user">
              <FontAwesomeIcon icon={faUser} /> User
            </Link>
          </li>
          <li>
            <Link to="/admin/plant">
              <FontAwesomeIcon icon={faSeedling} /> Plants
            </Link>
          </li>
          <li>
            <Link to="/admin/fertilizer">
              <FontAwesomeIcon icon={faPrescriptionBottle} /> Fertilizer
            </Link>
          </li>

          <li>
            <Link to="/admin/plants">
              <FontAwesomeIcon icon={faPrescriptionBottle} /> Order
            </Link>
          </li>
        
          <li>
          <button onClick={handleLogout} style={{fontSize:'25px',paddingLeft: '30px',background:'Brown'}}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </li>
        
        </ul>
      </nav>
    </div>
  );
}

export default AdminDashboard;


