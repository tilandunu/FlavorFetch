import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUsers() {
    const { id } = useParams();
    const [Supplyiteam, setSupplierIteam] = useState<string>("");
    const [Quantitiy, setQuantitiy] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching user data for ID:", id);
        axios.get('http://localhost:3001/getUser/' + id)
            .then(result => {
                console.log("Fetched user data:", result.data);
                setSupplierIteam(result.data.Supplyiteam || "");
                setQuantitiy(result.data.Quantitiy || "");
            })
            .catch(err => {
                console.log("Error fetching user data:", err);
                alert('Error fetching user data');
            });
    }, [id]);

    const Update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updating user data:", { Supplyiteam, Quantitiy });
        axios.put("http://localhost:3001/UpdateUser/" + id, { Supplyiteam, Quantitiy })
            .then(result => {
                console.log("User updated:", result.data);
                navigate('/');
            })
            .catch(err => {
                console.log("Error updating user:", err);
                alert('Error updating user');
            });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Supplier</h2>
                    <div className='mb-2'>
                        <label htmlFor="supplierItem">Supplier Item</label>
                        <input
                            type="text"
                            placeholder='Enter Supplier Item'
                            className='form-control'
                            value={Supplyiteam}
                            onChange={(e) => setSupplierIteam(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            placeholder='Enter Quantity'
                            className='form-control'
                            value={Quantitiy}
                            onChange={(e) => setQuantitiy(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success' type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUsers;
    