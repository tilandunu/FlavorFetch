import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the interface for ingredient
interface Ingredient {
  _id: string;
  name: string;
  catagory: string;
  quantity: number;
  minQuantity: number;
  price: number;
  lowStock: boolean;
  date: string;
  image: string;
}

function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/ingredients")
      .then((result) => setIngredients(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:3001/api/ingredients/deleteIngredient/" + id)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flix vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3"></div>
      <Link to="/create" className="btn btn-success">
        Add +
      </Link>
      <Link to="/requestIng" className="btn btn-success">
        Request Ingredient
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock Quantity</th>
            <th>Minimum Quantity</th>
            <th>Unit Price</th>
            <th>Stock status</th>
            <th>Created Date</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient._id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.catagory}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.minQuantity}</td>
              <td>{ingredient.price}</td>
              <td>{ingredient.lowStock ? "low stock" : "available"}</td>
              <td>{ingredient.date}</td>
              <td>{ingredient.image}</td>
              <td>
                <Link
                  to={`/update/${ingredient._id}`}
                  className="btn btn-success"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ingredient._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/stocknt" className="btn btn-success">
        Notify
      </Link>
    </div>
  );
}

export default Ingredients;
