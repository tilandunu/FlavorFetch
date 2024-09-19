import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([
        { id: "501", Supplyiteam: "Lime", Quantitiy: "10kg" }
    ]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    /*const handleDelete=(id)=>{
        axios.delete('/deleteUser/'+id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }*/

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Add Supplies +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Supply Item</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.Supplyiteam}</td>
                                <td>{user.Quantitiy}</td>
                                <td>
                                    <Link to={`/update/${user.id}`} className='btn btn-success'>Update</Link>
                                    <button className='btn btn-danger' /*onClick={() => handleDelete(user.id)}*/>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
