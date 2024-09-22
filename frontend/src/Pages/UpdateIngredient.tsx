import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Define the type for the route parameters
interface Params {
  id: string;
}

function UpdateIngredient() {
  const { id } = useParams<Params>();
  
  // State variables with appropriate types
  const [name, setName] = useState<string>("");
  const [catagory, setCatagory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [lowStock, setLowStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // For file input
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getIngredient/${id}`)
      .then(result => {
        setName(result.data.name);
        setCatagory(result.data.catagory);
        setQuantity(result.data.quantity);
        setMinQuantity(result.data.minQuantity);
        setLowStock(result.data.lowStock);
        setPrice(result.data.price);
        setDate(result.data.date);
        // Image handling would depend on your backend
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = (e: FormEvent) => {
    e.preventDefault();
    
    // Create form data to handle file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("catagory", catagory);
    formData.append("quantity", quantity.toString());
    formData.append("minQuantity", minQuantity.toString());
    formData.append("price", price.toString());
    formData.append("date", date);
    if (image) {
      formData.append("image", image);
    }

    axios.put(`http://localhost:3001/updateIngredient/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flix vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <h2>Update Ingredient</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              placeholder="Enter Ingredient Name" 
              className="form-control"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="catagory">Catagory</label>
            <input 
              type="text" 
              placeholder="Enter Ingredient Type" 
              className="form-control"
              value={catagory} 
              onChange={(e) => setCatagory(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="quantity">Stock Quantity</label>
            <input 
              type="number" 
              placeholder="Enter Stock Quantity" 
              className="form-control"
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="minQuantity">Minimum Quantity</label>
            <input 
              type="number" 
              placeholder="Enter minimum quantity to notify supplier management" 
              className="form-control"
              value={minQuantity} 
              onChange={(e) => setMinQuantity(Number(e.target.value))} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="price">Unit Price</label>
            <input 
              type="number" 
              placeholder="Enter Unit Price" 
              className="form-control"
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="date">Added Date</label>
            <input 
              type="date" 
              placeholder="Enter the date" 
              className="form-control"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image">Image</label>
            <input 
              type="file" 
              className="form-control"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateIngredient;