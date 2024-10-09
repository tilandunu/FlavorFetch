import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './upOrder.css'; 

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

    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

   
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/orders/${id}`);
                setInputs(response.data); 
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        if (id) {
            fetchOrder(); 
        }
    }, [id]);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/orders/${id}`, inputs); 
            toast.success("Order status updated successfully!", { position: "top-center" });
            navigate('/driverdashboard'); 
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Failed to update order status.", { position: "top-center" });
        }
    };

    // back navigation
    const handleBack = () => {
        navigate('/driverdashboard'); 
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
                        value={inputs.totalAmount} 
                        required
                        readOnly
                    />

                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        onChange={handleChange}
                        value={inputs.paymentMethod} 
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
                        value={inputs.status} 
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
                        value={inputs.deliveryAddress} 
                        required
                        readOnly
                    />

                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        onChange={handleChange}
                        value={inputs.ingredients.join(', ')} 
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
