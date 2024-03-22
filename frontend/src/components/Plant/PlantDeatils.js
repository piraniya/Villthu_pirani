// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../Header';
// import Footer from '../Footer';
// import { useParams } from 'react-router-dom';

// const PlantDetails = () => {
//   const [plant, setPlant] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     fetchPlantDetails(id);
//   }, [id]);

//   const fetchPlantDetails = async (plantId) => {
//     try {
//       const response = await fetch(`http://localhost:4008/api/plants/${plantId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch plant details');
//       }
//       const data = await response.json();
//       setPlant(data);
//     } catch (error) {
//       console.error('Error fetching plant details:', error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 py-5">
//         {plant ? (
//           <div className="row">
//             <div className="col-md-6">
//               <img src={plant.plantImage} alt={plant.plantName} className="img-fluid" />
//             </div>
//             <div className="col-md-6">
//               <h2>{plant.plantName}</h2>
//               <p>Botanical Name: {plant.botanicalName}</p>
//               <p>Fertilizer Type: {plant.fertilizerType}</p>
//               <p>Soil Type: {plant.soilType}</p>
//               <p>Description: {plant.description}</p>
//               {/* <Link to="/services" className="btn btn-primary">Back to Services</Link> */}
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Fertilizer from '../Plant/Fertilizer';
import { useParams } from 'react-router-dom';
import '../Plant/Plant.css';

const PlantDetails = () => {
  const [plant, setPlant] = useState(null);
  const [showDescription, setShowDescription] = useState(false); // State to manage whether to show description or not
  const { id } = useParams();

  useEffect(() => {
    fetchPlantDetails(id);
  }, [id]);

  const fetchPlantDetails = async (plantId) => {
    try {
      const response = await fetch(`http://localhost:4009/api/plants/${plantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plant details');
      }
      const data = await response.json();
      setPlant(data);
    } catch (error) {
      console.error('Error fetching plant details:', error);
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <>
      <div className='botanical' style={{paddingTop:'100px'}}>
        <div className="container my-5 py-5 plant-details-container" style={{ borderRadius: '10px', border: '2px solid brown' }}>
          {plant ? (
            <div className="row align-items-center">
              <div className="col-md-6 mb-4" style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                <h2>{plant.plantName}</h2>
                <img src={plant.plantImage.url} alt={plant.plantName} className="img-fluid" style={{ borderRadius: '300px', marginBottom: '20px', height: '40vh', width: '100%' }} />
              </div>
              <div className="col-md-6 mb-4" style={{ borderRadius: '300px' }}>
                <div className="plant-details-box">
                  <p style={{ fontSize: '18px', backgroundColor: '#f0f0f0', padding: '5px',fontStyle: 'italic' }}> {plant.botanicalName} ({plant.scientificName})</p>
                  <p>Fertilizer Type: {plant.fertilizerType}</p>
                  <p>Soil Type: {plant.soilType}</p>
                  {/* Toggle button to show/hide description */}            
                  <button onClick={toggleDescription} className="btn btn-primary"
                   style={{ backgroundColor: "brown", color: "white", padding: "8px 18px", 
                   borderRadius: "8px", textDecoration: "none" }}
                  >
                    {showDescription ? 'Hide Description' : 'Show '}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {/* Description card displayed above the section */}
          {showDescription && plant && (
            <div className="row align-items-center">
              <div className="" >
                <div className="plant-details-box">
                  <p>Description: {plant.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Fertilizer />
    </>
  );
};

export default PlantDetails;



  


