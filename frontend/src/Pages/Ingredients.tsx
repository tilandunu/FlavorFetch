import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Define the interface for ingredient
interface Ingredient {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  pricePerUnit: number;
  lowStock: boolean;
  date: string;
}

function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/ingredients/ingredients")
      .then((result) => setIngredients(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:3001/api/ingredients/ingredientsdeleteIngredient/" + id)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

    const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.text("Ingredient Report", 20, 10);

    doc.autoTable({
      head: [
        ["Name", "Category", "Stock Quantity", "Minimum Quantity", "Unit Price", "Stock Status", "Created Date"],
      ],
      body: filteredIngredients.map((ingredient) => [
        ingredient.name,
        ingredient.category,
        ingredient.quantity,
        ingredient.minQuantity,
        ingredient.pricePerUnit,
        ingredient.lowStock ? "Low Stock" : "Available",
        ingredient.date,
      ]),
    });

    doc.save("ingredient_report.pdf");
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

      <input
        type="text"
        placeholder="Search by name..."
        className="form-control my-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

  <button className="btn btn-primary my-3" onClick={downloadReport}>
          Download Report
        </button>


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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ingredient) => (
              <tr key={ingredient._id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.category}</td>
                <td>{ingredient.quantity}</td>
                <td>{ingredient.minQuantity}</td>
                <td>{ingredient.pricePerUnit}</td>
                <td>{ingredient.lowStock ? "low stock" : "available"}</td>
                <td>{ingredient.date}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No ingredients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Ingredients;
