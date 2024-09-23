import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequestIngredient() {
  const [ingName, setIngName] = useState<string>("");
  const [ingQty, setIngQty] = useState<number | string>("");
  const [notification, setNotification] = useState<string>(" ");
  const navigate = useNavigate();

  const Submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3001/requestIngrediant", {
        ingName,
        ingQty,
      });
      if (res) {
        if (res.status === 210) {
          setNotification("MESSAGE: " + res.data);
        } else if (res.status === 402) {
          setNotification("UNSUCCESS: " + res.data);
        }
      }
    } catch (error) {
      console.error("Error submitting request", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h3>Notifications: {notification}</h3>
        <form onSubmit={Submit}>
          <h2>Request Ingredients</h2>

          <div className="mb-2">
            <label>Ingredient Name</label>
            <input
              type="text"
              placeholder="Enter Ingredient Name"
              className="form-control"
              onChange={(e) => setIngName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Request Quantity</label>
            <input
              type="number"
              placeholder="Request Quantity"
              className="form-control"
              onChange={(e) => setIngQty(e.target.value)}
            />
          </div>

          <input type="submit" name="Request" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}

export default RequestIngredient;
