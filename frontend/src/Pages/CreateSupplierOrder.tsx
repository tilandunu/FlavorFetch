import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateSupplierOrder (){

    const [id,setID]=useState<string>()
    const [Supplyiteam,setSupplierIteam]=useState<string>()
    const [Quantitiy,setQuantitiy]=useState<string>()
    const navigate=useNavigate()

    const submit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:3001/CreateSupplierOrder",{id,Supplyiteam,Quantitiy})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err =>console.log(err))

    }
    return(    
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3'>

    <form onSubmit={submit}>
    <h2>Add Supllier</h2>
    <div className='mb-2'>

    <label htmlFor="">ID</label>
    <input type="text" placeholder='Enter ID' className='form-control' 
    onChange={(e) => setID(e.target.value)}/> 
    </div>
    <div className='mb-2'>
    <label htmlFor="">SupplierIteam</label>
    <input type="text" placeholder='Enter SupplierIteam' className='form-control'
    onChange={(e) => setSupplierIteam(e.target.value)}/>
     </div>
    <div className='mb-2'>
    <label htmlFor="">Quantitiy</label>
    <input type="text" placeholder='Enter Quantitiy' className='form-control'
    onChange={(e) => setQuantitiy(e.target.value)}/>
    </div>
    <button className='btn btn-success'>Submit</button>
        </form>
</div>
</div>
    )}
export default CreateSupplierOrder;