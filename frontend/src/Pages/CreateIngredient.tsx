import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IngredientData {
  name: string;
  catagory: string;
  quantity: number;
  minQuantity: number;
  price: number;
  date: string;
  image: File | null;
}

function CreateIngredient() {
  const [name, setName] = useState<string>("");
  const [catagory, setCatagory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const Submit = (e: FormEvent) => {
    e.preventDefault();

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

    axios
      .post(
        "http://localhost:3001/api/ingredients/createIngredient",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
        <form onSubmit={Submit}>
          <h2>Add Ingredient</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Ingredient Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Catagory</label>
            <input
              type="text"
              placeholder="Enter Ingredient Type"
              className="form-control"
              onChange={(e) => setCatagory(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Stock Quantity</label>
            <input
              type="number"
              placeholder="Enter Stock Quantity"
              className="form-control"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Minimum Quantity</label>
            <input
              type="number"
              placeholder="Enter minimum quantity to notify supplier management?"
              className="form-control"
              value={minQuantity}
              onChange={(e) => setMinQuantity(Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Unit Price</label>
            <input
              type="number"
              placeholder="Enter Unit Price"
              className="form-control"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Added Date</label>
            <input
              type="date"
              placeholder="Enter the date"
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Image</label>
            <input
              type="file"
              placeholder="Add image here"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <button className="btn btn-success">Add</button>
        </form>
      </div>
    </div>
  );
}

export default CreateIngredient;
