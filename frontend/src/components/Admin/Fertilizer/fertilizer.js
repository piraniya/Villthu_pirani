import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Users() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    // Fetch fertilizers data
    axios.get('http://localhost:4009/api/fertilizers/')
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Delete fertilizer by ID
    axios.delete(`http://localhost:4009/api/fertilizers/${id}`)
      .then(res => {
        console.log(res)
        // Reload fertilizers data after deletion
        axios.get('http://localhost:4009/api/fertilizers')
          .then(res => {
            setData(res.data);
          })
          .catch(err => console.log(err));
      }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex vh-400 justify-content-center align-items-center" style={{ paddingLeft: '300px' }}>
      <div className="bg-white rounded p-3">
        <Link to="/admin/createFertilizer" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Fertilizer Image</th>
              <th>Fertilizer Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((fertilizer, index) => {
              return <tr key={index}>
                <td>
                  { fertilizer.image &&  fertilizer.image.url ? <img src= {fertilizer.image.url}alt={fertilizer.name} style={{ width: '100px', height: 'auto' }} /> : 'No image'} 
                    
                </td>
                <td>{fertilizer.name}</td>
                <td>{fertilizer.price}</td>
                <td>{fertilizer.description}</td>
                <td>{fertilizer.quantity}</td>
                <td>{fertilizer.stock}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Link to={`/admin/fertilizers/${fertilizer._id}`} className="btn btn-sm btn-success me-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button onClick={() => handleDelete(fertilizer._id)} className="btn btn-sm btn-danger">
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



