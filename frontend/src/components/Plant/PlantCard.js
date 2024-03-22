// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../Header';
// import Footer from '../Footer';

// const Services = () => {
//   const [plants, setPlants] = useState([]);
//   const [filteredPlants, setFilteredPlants] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const response = await fetch('http://localhost:4008/api/plants/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch plants');
//       }
//       const data = await response.json();
//       setPlants(data);
//       // Extract unique categories from plants data
//       const uniqueCategories = [...new Set(data.flatMap(plant => plant.categories))];
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error('Error fetching plants:', error);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     // Show all plants if "All" category is selected
//     if (category === 'All') {
//       setFilteredPlants([]);
//     } else {
//       // Filter plants based on selected category
//       const filtered = plants.filter(plant => plant.categories.includes(category));
//       setFilteredPlants(filtered);
//     }
//   };
  

//   return (
//     <>
//       <Header />
//       <div>
//         <section id="service">
//           <div className="container my-5 py-5">
//             <div className="row">
//               <div className="col-12">
//                 <h3 className="fs-5 text-center mb-0">Our Plants</h3>
//                 <h1 className="display-6 text-center mb-4">Discover Our Plants</h1>
//                 <hr className="w-25 mx-auto" />
//               </div>
//             </div>
//             <div className="row mt-5">
//               {categories.map(category => (
//                 <button
//                   key={category}
//                   className="btn btn-secondary"
//                   onClick={() => handleCategoryChange(category)}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//             <div className="row mt-3">
//               {(filteredPlants.length > 0 ? filteredPlants : plants).map(plant => (
//                 <div className="col-md-4" key={plant._id}>
//                   <div className="card p-3">
//                     <Link to={`/plants/${plant._id}`}>
//                       {plant.plantImage && (
//                         <img src={plant.plantImage.url} className="card-img-top" alt={plant.plantName} />
//                       )}
//                     </Link>
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-3 fs-4 fw-bold">{plant.plantName}</h5>
//                       <h6 className="card-title mb-3 fs-4 fw-bold">{plant.botanicalName}</h6>
//                       {/* <p className="card-text lead">{plant.description}</p> */}
//                       <Link to={`/plants/${plant._id}`} className="btn btn-primary">Learn more</Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Services;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa'; // Import Font Awesome icon


const Services = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:4009/api/plants/');
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const data = await response.json();
      setPlants(data);
      // Extract unique categories from plants data
      const uniqueCategories = [...new Set(data.flatMap(plant => plant.categories))];
      // Include "All" category button
      setCategories(['All', ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const handleCategoryChange = (category) => {
    // Show all plants if "All" category is selected
    if (category === 'All') {
      setFilteredPlants([]);
    } else {
      // Filter plants based on selected category
      const filtered = plants.filter(plant => plant.categories.includes(category));
      setFilteredPlants(filtered);
    }
  };

  return (
   
      <div>
        <section id="service">
          <div className="container my-5 py-5">
            <div className="row">
              <div className="col-12">
                <h3 className="fs-5 text-center mb-0">Our Plants</h3>
                <h1 className="display-6 text-center mb-4">Discover Our Plants</h1>
                <hr className="w-25 mx-auto" />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 d-flex justify-content-center">
                {categories.map(category => (
                  <button
                    key={category}
                    className="btn btn-secondary mx-2" 
                    onClick={() => handleCategoryChange(category)}
                    style={{
                      backgroundColor: 'black', 
                      color: 'white',
                      borderRadius: '20px', 
                      height:'60px',
                      top:'50%',
                      width:'15vh',
                      border: 'none', 
                      cursor: 'pointer' 
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="row mt-3">
              {(filteredPlants.length > 0 ? filteredPlants : plants).map(plant => (
                <div className="col-md-4" key={plant._id}>
                  <div className="card p-3">
                    <Link to={`/plants/${plant._id}`}>
                      {plant.plantImage && (
                        <img src={plant.plantImage.url} className="card-img-top" alt={plant.plantName} />
                      )}
                    </Link>
                    <div className="card-body text-center">
                      <h5 className="card-title mb-3 fs-4 fw-bold">{plant.plantName}</h5>
                      <h6 className="card-title mb-3  "  style={{  fontStyle: 'italic'  }}>{plant.botanicalName}</h6>
                      {/* <p className="card-text lead">{plant.description}</p> */}
                      {/* Replace "Learn More" button with Font Awesome icon */}
                      
                      <Link to={`/plants/${plant._id}`} className="brown-button"
                      style={{ backgroundColor: "brown", color: "white", padding: "8px 18px", borderRadius: "8px", textDecoration: "none" }}
                      >
                        <FaInfoCircle /> Learn more
                      </Link>
                      {/* className="brown-button" style={{ backgroundColor: "brown", color: "white", padding: "8px 18px", borderRadius: "8px", textDecoration: "none" }} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    
  );
};

export default Services;



