import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

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
        .delete(
          "http://localhost:3001/api/ingredients/ingredientsdeleteIngredient/" +
            id
        )
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
        [
          "Name",
          "Category",
          "Stock Quantity",
          "Minimum Quantity",
          "Unit Price",
          "Stock Status",
          "Created Date",
        ],
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

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userID");
    navigate("/signin");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="d-flix vh-100 bg-stone-100 justify-content-center align-items-center  font-poppins cursor-default">
      <div>
        {" "}
        <div className="mx-32 pt-20 pb-14 flex justify-between items-center">
          <h1 className="px-4 text-3xl">STOCK MANAGEMENT</h1>
          <div className="flex items-center gap-10">
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={goBack}
            >
              arrow_back
            </span>{" "}
            <Button className="bg-red-600" onClick={handleLogout}>
              LOGOUT
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mx-32 bg-white px-10 py-10 rounded-xl shadow-lg">
          <div className="flex items-center gap-1">
            <Link
              to="/create"
              className="bg-stone-700 mx-2 px-6 py-2 text-white rounded-lg hover:bg-black hover:text-white duration-500 text-sm"
            >
              ADD +
            </Link>
            <Link
              to="/pendingSuppliesNotification"
              className="bg-stone-700 mx-2 px-6 py-2 text-white rounded-lg hover:bg-black hover:text-white duration-500 text-sm"
            >
              PENDING ORDERS
            </Link>
          </div>

          <div className="flex gap-7">
            {" "}
            <input
              type="text"
              placeholder="Search by name..."
              className="border-2 border-stone-500 py-2 pl-3 pr-20 rounded-2xl placeholder:text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary my-3 border-b-2 hover:border-black duration-500 text-sm"
              onClick={downloadReport}
            >
              Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16 pb-12">
        <table className="table">
          <thead>
            <tr className="bg-[#252525] text-left text-stone-200 text-sm">
              <th className="px-5 py-4 border-2">Name</th>
              <th className="px-5 py-4 border-2">Category</th>
              <th className="px-5 py-4 border-2">Stock Quantity</th>
              <th className="px-5 py-4 border-2">Minimum Quantity</th>
              <th className="px-5 py-4 border-2">Unit Price</th>
              <th className="px-5 py-4 border-2">Stock status</th>
              <th className="px-5 py-4 border-2">Created Date</th>
              <th className="px-5 py-4 border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ingredient) => (
                <tr
                  key={ingredient._id}
                  className="text-left text-black text-sm bg-white"
                >
                  <td className="px-5 py-4 border-2">{ingredient.name}</td>
                  <td className="px-5 py-4 border-2">{ingredient.category}</td>
                  <td className="px-5 py-4 border-2">{ingredient.quantity}</td>
                  <td className="px-5 py-4 border-2">
                    {ingredient.minQuantity}
                  </td>
                  <td className="px-5 py-4 border-2">
                    {ingredient.pricePerUnit}
                  </td>
                  <td className="px-5 py-4 border-2">
                    {ingredient.lowStock ? "low stock" : "available"}
                  </td>
                  <td className="px-5 py-4 border-2">{ingredient.date}</td>
                  <td className="px-5 py-4 border-2">
                    <div className="flex gap-5 cursor-pointer">
                      <Link
                        to={`/update/${ingredient._id}`}
                        className="btn btn-success"
                      >
                        <span class="material-symbols-outlined">edit</span>
                      </Link>
                      <span
                        class="material-symbols-outlined text-red-600"
                        onClick={() => handleDelete(ingredient._id)}
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center px-4 py-2">
                  No ingredients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ingredients;
