import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false); // New state variable
  useEffect(() => {
    fetchOrders();
  }, [deleteSuccess]); // Update orders when deleteSuccess changes
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4009/api/v1/order');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4009/api/v1/order/${orderId}`);
      setDeleteSuccess(true); // Set deleteSuccess to true
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setUpdatedData({ ...order });
  };
  const handleUpdateOrder = async () => {
    try {
      await axios.put(`http://localhost:4009/api/v1/order/${editingOrder._id}`, updatedData);
      fetchOrders();
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };
  return (
    <div className="d-flex vh-600 justify-content-center align-items-center" style={{ paddingLeft: '300px' }}>
      <div className="bg-white rounded p-3">
      <h2>Order List</h2>
      {deleteSuccess && <div className="success-message">Order deleted successfully</div>} {/* Show success message */}
      <table className='table'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Cash on Delivery</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.userId}</td>
              <td>{order.cashOnDelivery ? 'Yes' : 'No'}</td>
              
              {/* <td>{new Date(order.createdAt).toLocaleString()}</td> */}
              <td>
                <button onClick={() => handleEditOrder(order)}className="btn btn-sm btn-success me-2"><FontAwesomeIcon icon={faEdit} /></button> {/* Fix onClick handler */}
                <button onClick={() => handleDeleteOrder(order._id)}className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Order</h2>
            <label>Amount:</label>
            <input
              type="text"
              value={updatedData.amount}
              onChange={(e) => setUpdatedData({ ...updatedData, amount: e.target.value })}
            />
            {/* Add input fields for other order properties */}

            <div className="d-flex align-items-center">
            <button onClick={handleUpdateOrder} className="btn btn-sm btn-success me-2"><FontAwesomeIcon icon={faEdit} /></button>
            <button onClick={() => setEditingOrder(null)} className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
</div>


             

          </div>
        </div>
        
      )}
      </div>
    </div>
  );
};
export default OrderList;

