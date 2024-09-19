import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateSupplierOrder() {
    const { id } = useParams<{ id: string }>();  // Getting ID from the URL parameters
    const [SupplyItem, setSupplyItem] = useState<string>("");  // Fixed typo
    const [Quantity, setQuantity] = useState<string>("");      // Fixed typo
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            console.log("Fetching user data for ID:", id);
            axios.get(`http://localhost:3001/getSupplierOrder/${id}`)
                .then(result => {
                    console.log("Fetched user data:", result.data);
                    setSupplyItem(result.data.SupplyItem || "");
                    setQuantity(result.data.Quantity || "");
                })
                .catch(err => {
                    console.error("Error fetching user data:", err);
                    alert('Error fetching user data');
                });
        }
    }, [id]);

    const update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updating user data:", { id, SupplyItem, Quantity });

        axios.put(`http://localhost:3001/UpdateSupplierOrder/${id}`, { SupplyItem, Quantity })
            .then(result => {
                console.log("Supplier updated:", result.data);
                navigate('/');
            })
            .catch(err => {
                console.error("Error updating Supplier:", err);
                alert('Error updating Supplier');
            });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={update}>
                    <h2>Update Supplier</h2>

                    <div className='mb-2'>
                        <label htmlFor="supplierItem">Supplier Item</label>
                        <input
                            type="text"
                            placeholder='Enter Supplier Item'
                            className='form-control'
                            value={SupplyItem}
                            onChange={(e) => setSupplyItem(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            placeholder='Enter Quantity'
                            className='form-control'
                            value={Quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <button className='btn btn-success' type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSupplierOrder;
