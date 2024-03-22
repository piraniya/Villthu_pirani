// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function CreateUser() {
//   const [plantName, setPlantName] = useState("");
//   const [fertilizerType, setFertilizerType] = useState("");
//   const [soilType, setSoilType] = useState("");
//   const [botanicalName, setBotanicalName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('plantImage', plantImage);
//     formData.append('plantName', plantName);
//     formData.append('fertilizerType', fertilizerType);
//     formData.append('soilType', soilType);
//     formData.append('botanicalName', botanicalName);
//     formData.append('description', description);
//     formData.append('category', category);

//     axios.post('http://localhost:4008/api/plants/new', formData)
//       .then(res => {
//         console.log(res);
//         setSuccessMessage("Plant added successfully!");
//         setError("");
//         // Reset form fields after successful submission
//         setPlantName("");
//         setFertilizerType("");
//         setSoilType("");
//         setBotanicalName("");
//         setDescription("");
//         setCategory("");
//         setPlantImage(null);
//         navigate('/admin');
//       })
//       .catch(err => {
//         console.log(err);
//         setError("Error submitting the form. Please check the input fields and try again.");
//         setSuccessMessage("");
//       });
//   }

//   const handleCancel = () => {
//     navigate("/admin"); // Navigate back to the admin page
//   };

//   return (
//     <div className="d-flex vh-50 justify-content-center align-items-center">
//       <div className="w-50 bg-white rounded p-3">
//         <form onSubmit={handleSubmit}>
//           <h2>Add Plant</h2>
//           {successMessage && <div className="alert alert-success">{successMessage}</div>}
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="mb-2">
//             <label htmlFor="image">Plant Image</label>
//             <input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="name">Plant Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Enter Plant Name"
//               className="form-control"
//               value={plantName}
//               onChange={(e) => setPlantName(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="fertilizerType">Fertilizer Type</label>
//             <input
//               id="fertilizerType"
//               type="text"
//               placeholder="Enter Fertilizer Type"
//               className="form-control"
//               value={fertilizerType}
//               onChange={(e) => setFertilizerType(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="soilType">Soil Type</label>
//             <input
//               id="soilType"
//               type="text"
//               placeholder="Enter Soil Type"
//               className="form-control"
//               value={soilType}
//               onChange={(e) => setSoilType(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="botanicalName">Botanical Name</label>
//             <input
//               id="botanicalName"
//               type="text"
//               placeholder="Enter Botanical Name"
//               className="form-control"
//               value={botanicalName}
//               onChange={(e) => setBotanicalName(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               placeholder="Enter Description"
//               className="form-control"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="category">Category</label>
//             <input
//               id="category"
//               type="text"
//               placeholder="Enter Category"
//               className="form-control"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <button type="submit" className="btn btn-primary mr-2">Submit</button>
//             <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateUser;


 
import React, { useState } from 'react';

const AddPart = () => {
  const [plantData, setPlantData] = useState({
    plantName: '',
    fertilizerType: '',
    soilType: '',
    botanicalName: '',
    description: '',
    categories: [],
    plantImage: null
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'plantImage') {
      setPlantData({
        ...plantData,
        plantImage: e.target.files[0]
      });
    } else if (e.target.name === 'categories') {
      // Handle categories separately
      const { options } = e.target;
      const selectedCategories = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedCategories.push(options[i].value);
        }
      }
      setPlantData({
        ...plantData,
        categories: selectedCategories
      });
    } else {
      const { name, value } = e.target;
      setPlantData({
        ...plantData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('plantName', plantData.plantName);
      formData.append('fertilizerType', plantData.fertilizerType);
      formData.append('soilType', plantData.soilType);
      formData.append('botanicalName', plantData.botanicalName);
      formData.append('description', plantData.description);
      formData.append('categories', plantData.categories);
      formData.append('plantImage', plantData.plantImage);

      const response = await fetch('http://localhost:4008/api/plants/new', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add plant');
      }

      setSuccessMessage('Plant added successfully!');
      // Reset form fields except categories
      setPlantData({
        plantName: '',
        fertilizerType: '',
        soilType: '',
        botanicalName: '',
        description: '',
        categories: plantData.categories,
        plantImage: null
      });
    } catch (error) {
      setError('Error adding plant. Please try again.');
      console.error('Error adding plant:', error);
    }
  };

  return (
    <div className="container-fluid"style={{fontSize:'2.2vh',}}>
    
    <div className="flex justify-content-center "style={{width:'160vh',paddingLeft:'45vh',borderRadius:'2vh',borderColor:'brown'}}>
    
      <div className="border border-dark p-3 bg-white rounded w-125">
        <div className="form-group">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <form onSubmit={handleSubmit} className="shadow-lg form">
            <div className="form-group">
            <h1 className="text-center mt-5">Botanical Plants</h1>
              <label htmlFor="plantName">Plant Name:</label>
              <input type="text" className="form-control" name="plantName" value={plantData.plantName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fertilizerType">Fertilizer Type:</label>
              <input type="text" className="form-control" name="fertilizerType" value={plantData.fertilizerType} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="soilType">Soil Type:</label>
              <input type="text" className="form-control" name="soilType" value={plantData.soilType} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="botanicalName">Botanical Name:</label>
              <input type="text" className="form-control" name="botanicalName" value={plantData.botanicalName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea name="description" className="form-control" value={plantData.description} onChange={handleChange} style={{ height: '150px' }} required />
            </div>
            <div className="form-group">
              <label htmlFor="categories">Categories:</label>
              <select multiple className="form-control" name="categories" onChange={handleChange} required>
                <option value="Sandy soils">Sandy soils</option>
                <option value="Alluvial soils">Alluvial soils</option>
                <option value="Alkalin saline soil ">Alkalin saline soil</option>
                <option value="Red Yellow latasol soil">Red Yellow latasol soil</option>
                <option value="Regasol">Regasol</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="plantImage">Plant Image:</label>
              <input type="file" className="form-control" name="plantImage" onChange={handleChange} accept="image/*" required />
            </div>
            <button type="submit" className="btn btn-block btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
);
};

export default AddPart;



