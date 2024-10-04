import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateIngredient() {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const ingredientData = {
      name,
      category,
      quantity,
      minQuantity,
      pricePerUnit,
    };

    axios
      .post(
        "http://localhost:3001/api/ingredients/createIngredient",
        ingredientData
      )
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Ingredient</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Ingredient Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Category</label>
            <input
              type="text"
              placeholder="Enter Ingredient Category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Stock Quantity</label>
            <input
              type="number"
              placeholder="Enter Stock Quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Minimum Quantity</label>
            <input
              type="number"
              placeholder="Enter Minimum Quantity"
              className="form-control"
              value={minQuantity}
              onChange={(e) => setMinQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Price Per Unit</label>
            <input
              type="number"
              placeholder="Enter Price Per Unit"
              className="form-control"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(Number(e.target.value))}
            />
          </div>
          <button className="btn btn-success">Add Ingredient</button>
        </form>
      </div>
    </div>
  );
}

export default CreateIngredient;
