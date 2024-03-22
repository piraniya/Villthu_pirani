import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        message: '',
        name: '',
        position: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/reviews'); // Assuming your API endpoint for fetching reviews is '/api/reviews'
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviews', formData); // Assuming your API endpoint for submitting reviews is '/api/reviews'
            toast.success('Review submitted successfully');
            setFormData({ message: '', name: '', position: '' });
            fetchData(); // Refresh reviews after submission
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
            <h1>Reviews</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
                <button type="submit">Submit</button>
            </form>
            <div>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <p>Message: {review.message}</p>
                        <p>Name: {review.name}</p>
                        <p>Position: {review.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
