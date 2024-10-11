import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import axios from "axios";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching orders specific to the logged-in customer
  useEffect(() => {
    const fetchOrders = async () => {
      const customerUID = Cookies.get("userID"); // Get customer ID from cookies
      if (!customerUID) {
        setError("Customer ID not found. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/api/order/customerOrders?customerUID=${customerUID}&status=Delivered`
        );
        setOrders(response.data); // Setting the orders to state
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Navigation functions
  const navigateOrderManagementNC = () => navigate("/orderManagementNC");
  const navigateOrderManagement = () => navigate("/orderManagement");
  const navigateHome = () => navigate("/home");

  // Modal handling
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Loading and error states
  if (isLoading)
    return <div className="text-center mt-8">Loading orders...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="bg-slate-600 p-1">
      <div className="flex font-poppins cursor-default bg-white m-3 rounded-lg">
        <div className="flex flex-col items-center w-[25%]">
          <img
            src="../trans black.png"
            alt="Logo"
            className="w-28 h-28 mt-16 mb-28"
          />
          <div className="flex flex-col gap-8 cursor-pointer">
            <div
              className="bg-slate-800 flex justify-center w-44 h-8 items-center rounded-2xl"
              onClick={navigateOrderManagement}
            >
              <p className="uppercase text-xs text-white">Delivered</p>
            </div>
            <div
              className="bg-slate-200 flex justify-center w-44 h-8 items-center rounded-2xl"
              onClick={navigateOrderManagementNC}
            >
              <p className="uppercase text-xs text-black">To-Be Delivered</p>
            </div>
          </div>
        </div>

        <div className="flex items-center my-12">
          <Separator
            orientation="vertical"
            className="bg-stone-200 min-h-screen"
          />
        </div>

        {/* Orders dashboard */}
        <div className="flex flex-col w-[75%] px-32">
          <div className="flex flex-col">
            <div className="flex justify-between items-center my-20">
              <p className="text-2xl">ORDER DASHBOARD</p>
              <div className="flex gap-7">
                <span
                  className="material-symbols-outlined hover:cursor-pointer"
                  onClick={navigateHome}
                >
                  home
                </span>
              </div>
            </div>

            {/* Displaying customer-specific completed orders */}
            {orders.map((order) => (
              <section
                key={order._id}
                className="flex flex-col w-full my-5"
                onClick={() => openModal(order)}
              >
                <div className="flex bg-white py-10 px-10 shadow-md rounded-lg border-2 border-stone-400 justify-between items-center">
                  <p>ORDER #{order._id}</p>
                  <p className="text-xs text-stone-400">CLICK TO VIEW</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for viewing order details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-poppins">
          <div className="bg-white p-8 rounded-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>Order ID: {selectedOrder._id}</p>
            <p>Status: {selectedOrder.status}</p>
            <p>Total Amount: Rs.{selectedOrder.totalAmount.toFixed(2)}</p>
            <h3 className="font-semibold mt-4">Ingredients:</h3>
            <ul>
              {selectedOrder.ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredientName}: {item.quantity}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 bg-slate-800 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
