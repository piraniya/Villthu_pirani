import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
 import '../User/CreateUser'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
function Users() {
    const {id} = useParams()
     
      const [data, setData] = useState([])
      const navigate = useNavigate()
      
      useEffect(()=> {
        axios.get('http://localhost:4009/api/admin/users')
        .then(res => {
            console.log(res);
          setData(res.data);
        })
        .catch(err => console.log(err));
      }, [])
   
    const handleDelete = (id) => {
        axios.delete('http://localhost:4009/api/admin/user/'+id)
        .then(res => {
            console.log(res)
            navigate('/admin')
        }).catch(err => console.log(err))
    }
     
  return (
  //  <>
  //  <CreateUser /> 
   
    <div className="d-flex   justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/admin/createUser" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((user, index) => {
                    return <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        
                        <td>
                            <Link to={`/admin/users/${user._id}`} className="btn btn-sm btn-success me-2"><FontAwesomeIcon icon={faEdit} /></Link>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
                        </td>
                    </tr>
                })
            }
          </tbody>
        </table>
      </div>
    </div>
    
  );
}
 
export default Users;

 







