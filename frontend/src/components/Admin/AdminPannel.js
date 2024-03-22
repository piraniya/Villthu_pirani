import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNavbar';
import AdminPlant from './AdminPlant';
import User from './User/User';
import CreateUser from './User/CreateUser';
import Logout from '../Admin/Logout';
import UpdateUser from './User/UpdateUser';

import Plant from './Plant/Plant';
import CreatePlant from './Plant/CreatePlant'
import UpdatePlant from './Plant/UpdatePlant';

import Fertilizer from './Fertilizer/fertilizer';
import CreateFertilizer from './Fertilizer/CreateFertilizer';
function Admin (){
  return (
    <div>
      <AdminNavbar />
    
     
     {/* <AdminPlant /> */}
     <Logout />
      <Routes>

      {/* <Route path="/users" element={<User />} /> */}
      <Route path="/plants" element={<AdminPlant />} />
      <Route path="/createUser" element={<CreateUser />} />
      <Route path="/user" element={<User />} />
      <Route path="/users/:id" element={<UpdateUser />} />

      <Route path="/logout" element={<Logout />} />
      <Route path="plant" element={<Plant/>} />
      <Route path='/createPlant' element={<CreatePlant />} />
      <Route path="/plants/:id" element={<UpdatePlant />} />
       
       <Route path="fertilizer" element={<Fertilizer />} />
      <Route path ="/createFertilizer" element={<CreateFertilizer />} />
     </Routes>
    </div>
  );
};

export default Admin;