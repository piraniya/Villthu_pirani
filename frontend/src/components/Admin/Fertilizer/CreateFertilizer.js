import React, { useState } from 'react';

const AddFertilizer = () => {
  const [fertilizerData, setFertilizerData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    stock: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFertilizerData({
      ...fertilizerData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFertilizerData({
      ...fertilizerData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', fertilizerData.name);
      formData.append('price', fertilizerData.price);
      formData.append('description', fertilizerData.description);
      formData.append('image', fertilizerData.image);
      formData.append('stock', fertilizerData.stock);

      const response = await fetch('http://localhost:4009/api/fertilizers/new', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add fertilizer');
      }

      setSuccessMessage('Fertilizer added successfully!');
      // Reset form fields
      setFertilizerData({
        name: '',
        price: '',
        description: '',
        image: null,
        stock: ''
      });
    } catch (error) {
      setError('Error adding fertilizer. Please try again.');
      console.error('Error adding fertilizer:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="flex justify-content-center" style={{ width: '50%', margin: 'auto' }}>
        <div className="border border-dark p-3 bg-white rounded">
          <div className="form-group">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit} className="form">
              <h1 className="text-center mt-5">Add Fertilizer</h1>
              <div className="form-group">
                <label htmlFor="name">Fertilizer Name:</label>
                <input type="text" className="form-control" name="name" value={fertilizerData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="text" className="form-control" name="price" value={fertilizerData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea name="description" className="form-control" value={fertilizerData.description} onChange={handleChange} style={{ height: '150px' }} required />
              </div>
              <div className="form-group">
                <label htmlFor="image">Fertilizer Image:</label>
                <input type="file" className="form-control" name="image" onChange={handleImageChange} accept="image/*" required />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input type="number" className="form-control" name="stock" value={fertilizerData.stock} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-block btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFertilizer;

