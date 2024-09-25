import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const OrderManagementNC = () => {
  const [orders, setOrders] = useState([]); // Orders state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order data
  const [newAddress, setNewAddress] = useState(""); // Store new delivery address
  const [error, setError] = useState(null); // Error state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch customer orders
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
          `http://localhost:3001/api/order/customerOrders?customerUID=${customerUID}&status=To-Be-Delivered`
        );
        setOrders(response.data); // Set fetched orders
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const navigateOrderManagementNC = () => {
    navigate("/orderManagementNC");
  };

  const navigateOrderManagement = () => {
    navigate("/orderManagement");
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order); // Set the selected order data
    setNewAddress(order.deliveryAddress); // Set the existing address in the modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to update the delivery address in the backend
  const handleSaveAddress = async () => {
    if (!selectedOrder || !newAddress) {
      setError("Please select an order and provide a valid address.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/order/${selectedOrder._id}`, {
        deliveryAddress: newAddress,
      });
      // Update the orders list with the new address
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, deliveryAddress: newAddress }
          : order
      );
      setOrders(updatedOrders);
      setIsModalOpen(false); // Close the modal after save
      setError(null); // Clear any errors
    } catch (err) {
      setError("Failed to update the address. Please try again.");
    }
  };

  // Function to delete an order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return; // Confirm the deletion
    }

    try {
      await axios.delete(`http://localhost:3001/api/order/${orderId}`);
      // Remove the deleted order from the state
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
      setError(null); // Clear any errors
    } catch (err) {
      setError("Failed to delete the order. Please try again.");
    }
  };

  const navigateHome = () => {
    navigate("/home");
  };

  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center mt-8">Loading orders...</div>;
  }
  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

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
              className="bg-slate-200 flex justify-center w-44 h-8 items-center rounded-2xl"
              onClick={navigateOrderManagement}
            >
              <p className="uppercase text-xs text-black">Completed</p>
            </div>
            <div
              className="bg-slate-800 flex justify-center w-44 h-8 items-center rounded-2xl"
              onClick={navigateOrderManagementNC}
            >
              <p className="uppercase text-xs text-white">To-Be Delivered</p>
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

            {/* Display customer orders */}
            {orders.map((order) => (
              <section key={order._id} className="flex flex-col w-full my-5">
                <div
                  className="flex bg-white py-9 px-10 shadow-md rounded-lg border-2 border-stone-400 justify-between items-center cursor-pointer"
                  onClick={() => handleOpenModal(order)}
                >
                  <p>ORDER #{order._id}</p>
                  <div className="flex gap-8">
                    <span
                      className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents parent click event
                        handleOpenModal(order);
                      }}
                    >
                      edit
                    </span>
                    <span
                      className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents parent click event
                        handleDeleteOrder(order._id);
                      }}
                    >
                      delete
                    </span>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for editing delivery address */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Order Details</h2>
            <p>Order ID: {selectedOrder._id}</p>
            <label className="block mt-4">
              <span className="text-gray-700">Delivery Address:</span>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleSaveAddress}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementNC;
