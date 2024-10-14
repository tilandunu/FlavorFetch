import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import axios from "axios";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf"; // Import jsPDF

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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

  // Filtering orders based on the search term
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Order Invoice", 20, 20);

    // Add order details
    doc.setFontSize(12);
    doc.text(`Order ID: ${selectedOrder._id}`, 20, 30);
    doc.text(`Status: ${selectedOrder.status}`, 20, 40);
    doc.text(
      `Total Amount: Rs.${selectedOrder.totalAmount.toFixed(2)}`,
      20,
      50
    );

    // Add ingredients
    doc.text("Ingredients:", 20, 60);
    selectedOrder.ingredients.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.ingredientName}: ${item.quantity}`,
        20,
        70 + index * 10
      );
    });

    // Save the PDF
    doc.save(`Order_${selectedOrder._id}_Invoice.pdf`);
  };

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
              <div className="flex items-center gap-7">
                {/* Search input */}
                <Input
                  type="text"
                  className="rounded-full border border-black"
                  placeholder="Search by Order ID"
                  value={searchTerm} // Bind input value to state
                  onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                />
                <span
                  className="material-symbols-outlined hover:cursor-pointer"
                  onClick={navigateHome}
                >
                  home
                </span>
              </div>
            </div>

            {/* Displaying customer-specific completed orders */}
            {filteredOrders.map((order) => (
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

            {/* If no orders match the search term */}
            {filteredOrders.length === 0 && (
              <div className="text-center mt-8 text-gray-500">
                No orders found for "{searchTerm}".
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for viewing order details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-poppins">
          <div className="bg-white p-8 rounded-lg w-[70%] py-12">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-xl font-semibold">
                Order #{selectedOrder._id}
              </h2>
              <button
                className=" bg-slate-800 text-white w-11 h-10 rounded"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div className="flex flex-row w-full gap-10">
              <div className="flex flex-col border border-black w-1/2 px-7 py-3">
                <div className="flex justify-between py-3">
                  <p>INGREDIENTS</p>
                  <p>QUANTITY</p>
                </div>
                <hr className="pb-3" />
                <ul>
                  {selectedOrder.ingredients.map((item, index) => (
                    <li key={index}>
                      <div className="flex justify-between py-2">
                        <p>{item.ingredientName}</p>
                        <p>{item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col border border-black w-1/2 items-center py-10">
                <p className="font-semibold py-2">FINAL BILL</p>
                <div className="flex flex-row gap-7 border border-black p-3 items-center">
                  <p>AMOUNT</p>
                  <p>Rs.{selectedOrder.totalAmount.toFixed(2)}/=</p>
                </div>
                <Separator className="my-4 w-1/2 bg-black" />
                <div className="flex flex-col items-center">
                  <p className="font-semibold">STATUS</p>
                  <p>{selectedOrder.status}</p>
                </div>
                <Separator className="my-4 w-1/2 bg-black" />
                <div className="flex flex-col items-center">
                  <p className="font-semibold">PAYMENT METHOD</p>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
                <button
                  className="mt-6 bg-slate-800 text-white py-2 px-4 rounded"
                  onClick={generatePDF} // Link the PDF generation function
                >
                  Download Report
                </button>
              </div>
            </div>

            <div className="flex flex-row gap-10"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
