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
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [lowStock, setLowStock] = useState<boolean>(false); // Use boolean type for lowStock
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/ingredients/getIngredient/${id}`)
      .then((result) => {
        setName(result.data.name);
        setCategory(result.data.category);
        setQuantity(result.data.quantity);
        setMinQuantity(result.data.minQuantity);
        setLowStock(result.data.lowStock);
        setPricePerUnit(result.data.pricePerUnit);
        setDate(result.data.date);
        // Image handling would depend on your backend
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateIngredient = (e: FormEvent) => {
    e.preventDefault();

    // Create form data to handle file uploads
    // Use JSON to update ingredient details
    const updatedIngredient = {
      name,
      category,
      quantity,
      minQuantity,
      pricePerUnit,
      date,
    };

    axios.put(`http://localhost:3001/api/ingredients/updateIngredient/${id}`, updatedIngredient, {
      headers: {
        "Content-Type": "application/json",
      },
    })

      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={updateIngredient}>
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
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Enter Ingredient Category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              placeholder="Enter Minimum Quantity"
              className="form-control"
              value={minQuantity}
              onChange={(e) => setMinQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="pricePerUnit">Unit Price</label>
            <input
              type="number"
              placeholder="Enter Unit Price"
              className="form-control"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(Number(e.target.value))}
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
          
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateIngredient;

