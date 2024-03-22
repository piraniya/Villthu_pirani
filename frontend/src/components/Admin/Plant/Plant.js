import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Users() {
  const {id} = useParams()
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    // Fetch plants data
    axios.get('http://localhost:4009/api/plants/')
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Delete plant by ID
    axios.delete(`http://localhost:4009/api/plants/${id}`)
      .then(res => {
        console.log(res)
        // Reload plants data after deletion
        axios.get('http://localhost:4009/api/plants')
          .then(res => {
            setData(res.data);
          })
          .catch(err => console.log(err));
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex vh-400  justify-content-center align-items-center"style={{ paddingLeft: '300px' }}>
      <div className="bg-white rounded p-3">
        <Link to="/admin/createPlant" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Plant Image</th>
              <th>Plant Name</th>
              <th>Botanical Name</th>
              <th>Fertilizer Type</th>
              <th>Soil Type</th>
              <th>Description</th>
              <th>categories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((plant, index) => {
              return <tr key={index}>
                <td>
                { plant.plantImage && plant.plantImage.url ? <img src={plant.plantImage.url} alt={plant.plantName} style={{ width: '100px', height: 'auto' }} /> : 'No image'}   
                </td>
                <td>{plant.plantName}</td>
                <td>{plant.botanicalName}</td>
                <td>{plant.fertilizerType}</td>
                <td>{plant.soilType}</td>
                <td>{plant.description}</td>
                <td>{plant.categories}</td>
                <td>
                <div className="d-flex align-items-center">
                  <Link to={`/admin/plants/${plant._id}`} className="btn btn-sm btn-success me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button onClick={() => handleDelete(plant._id)} className="btn btn-sm btn-danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  </div> 
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;

