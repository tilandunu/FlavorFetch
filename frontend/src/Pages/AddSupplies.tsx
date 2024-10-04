import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AddSupplies = () => {
  const supplierUID = Cookies.get("userID");
  const [quantity, setQuantity] = useState(0);
  const [ingredientName, setIngredientName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Ingredient name validation: only letters and spaces allowed
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!nameRegex.test(ingredientName)) {
      setErrorMessage("Ingredient name can only contain letters and spaces.");
      return;
    }

    // Quantity validation: positive integers only
    if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
      setErrorMessage("Quantity must be a positive integer.");
      return;
    }

    const newSupply = {
      supplierID: supplierUID,
      ingredientName,
      quantity,
    };

    try {
      await axios.post("http://localhost:3001/api/supplyOrder", newSupply);
      alert("Supply added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding supply:", error);
      alert("Failed to add supply.");
    }
  };

  return (
    <div className="min-h-screen font-poppins">
      <img
        src={"../sup.jpg"}
        alt=""
        className="w-full h-[700px] opacity-  blur-sm  object-cover"
      />
      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div className="lg:mt-20 mt-[270px]">
          <div className="w-[1200px] h-[550px] ml-36 rounded-3xl shadow-sm bg-gray-100">
            <Link to={`/manageSupplies`}>
              <button className="absolute mt-8 w-32 h-10 rounded-full border-2 ml-36 uppercase bg-slate-200 hover:bg-red-600 hover:text-white">
                Back
              </button>
            </Link>
            <div className="flex justify-center items-center">
              <div>
                <div className="mt-9 text-3xl font-serif">New Supply</div>
              </div>
            </div>
            <div className="flex justify-center mt-10 items-center">
              <form
                className="flex flex-col mt-10 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="mt-4">
                  <input
                    className="bg-slate-200 p-3 rounded-lg w-[400px] h-20"
                    type="text"
                    placeholder="Name"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="bg-slate-200 p-3 rounded-lg w-[400px] h-10"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                {errorMessage && (
                  <div className="text-red-500">{errorMessage}</div>
                )}
                <button
                  className="bg-[#ee4603] hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90 mt-6"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplies;
