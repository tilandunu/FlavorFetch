import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './upOrder.css'; // Import the CSS file for styling

const UpdateOrder: React.FC = () => {
    const [inputs, setInputs] = useState<{
        totalAmount: string; 
        paymentMethod: string;  
        status: string; 
        deliveryAddress: string; 
        ingredients: string[]; 
    }>({
        totalAmount: '', 
        paymentMethod: '',  
        status: '', 
        deliveryAddress: '', 
        ingredients: [], 
    });

    const { id } = useParams<{ id: string }>(); // Get order ID from the URL
    const navigate = useNavigate();

    // Fetch the order data when the component mounts
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/orders/${id}`);
                setInputs(response.data); // Populate the form fields with the order data
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        if (id) {
            fetchOrder(); // Fetch the order data if ID exists
        }
    }, [id]);

    // Handle input changes and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission for updating the order
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/orders/${id}`, inputs); // Update order data via API
            toast.success("Order status updated successfully!", { position: "top-center" });
            navigate('/driverdashboard'); // Redirect after successful update
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Failed to update order status.", { position: "top-center" });
        }
    };

    // Handle back navigation
    const handleBack = () => {
        navigate('/driverdashboard'); // Navigate back to the dashboard
    };

    return (
        <div className='cont'>
            <div className="update-order-container">
                <h1 className="form-title">Update Delivery Status</h1>
                <form onSubmit={handleSubmit} className="update-order-form">

                    <label htmlFor="totalAmount">Total Amount</label>
                    <input
                        id="totalAmount"
                        type="number"
                        name="totalAmount"
                        onChange={handleChange}
                        value={inputs.totalAmount} // Show current total amount
                        required
                        readOnly
                    />

                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        onChange={handleChange}
                        value={inputs.paymentMethod} // Show current payment method
                        required
                    >
                        <option value="">Select a method</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Debit/Credit">Debit/Credit</option>
                    </select>

                    <label htmlFor="status">Order Status</label>
                    <select
                        id="status"
                        name="status"
                        onChange={handleChange}
                        value={inputs.status} // Show current status
                        required
                    >
                        <option value="">Select status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <label htmlFor="deliveryAddress">Delivery Address</label>
                    <input
                        id="deliveryAddress"
                        type="text"
                        name="deliveryAddress"
                        onChange={handleChange}
                        value={inputs.deliveryAddress} // Show current delivery address
                        required
                        readOnly
                    />

                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        onChange={handleChange}
                        value={inputs.ingredients.join(', ')} // Display ingredients as a comma-separated list
                        required
                        readOnly
                    />
                    
                    <button type="submit" className="submit-button">Change Status</button>
                    <button type="button" className="back-button" onClick={handleBack}>Back</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrder;
