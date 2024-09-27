import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditSupplies = () => {
  const { orderId } = useParams(); // Get the orderId from URL
  const [order, setOrder] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [ingredientName, setIngredientName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch the supply order details by orderId
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/supplyOrder/orderData/${orderId}` // Updated endpoint
        );
        setOrder(response.data);
        setQuantity(response.data.quantity);
        setIngredientName(response.data.ingredientName);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  // Handle form submission to update the order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
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

    try {
      await axios.put(
        `http://localhost:3001/api/supplyOrder/orders/${orderId}`,
        {
          ingredientName,
          quantity,
        }
      );
      alert("Supply edited successfully!");
      navigate("/manageSupplies");
    } catch (error) {
      console.error("Error updating order", error);
      alert("Failed to add supply.");
    }
  };

  const goBack = () => {
    navigate("/manageSupplies");
  };

  return (
    <div className="min-h-screen">
      <img
        src={"../sup.jpg"}
        alt=""
        className="w-full h-[700px] opacity-100 blur-sm object-cover"
      />
      <div className="absolute transform -translate-x-0 translate-y-0 top-1 flex justify-center items-center">
        <div className="lg:mt-20 mt-[270px] md:mt-20 ml-[4px]">
          <div className="w-[1200px] h-[550px] mt-12 ml-36 rounded-3xl shadow-sm bg-gray-100">
            <div className="flex justify-center items-center">
              <div>
                <div className="mt-9 text-3xl font-serif">Edit Supply</div>
              </div>
            </div>
            <div className="flex justify-center mt-10 items-center">
              <form
                className="flex flex-col mt-10 gap-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <input
                    className="bg-slate-200 p-3 rounded-lg w-[400px] h-10"
                    type="text"
                    placeholder="Ingredient Name"
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
                <div className="flex flex-col gap-5 mt-10">
                  {" "}
                  <button
                    className="bg-[#ee4603] hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90 duration-300"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="bg-[#242424] hover:text-white font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90 duration-300"
                    type="button"
                    onClick={goBack}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplies;
