import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigateOrderManagementNC = () => {
    navigate("/orderManagementNC");
  };

  const navigateOrderManagement = () => {
    navigate("/orderManagement");
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const openModal = (orderId) => {
    setSelectedOrder(orderId); // Set the order ID for display in the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-slate-600 p-1">
      <div className="flex font-poppins cursor-default bg-white m-3 rounded-lg">
        <div className="flex flex-col items-center w-[25%]">
          <img
            src="../trans black.png"
            alt=""
            className="w-28 h-28 mt-16 mb-28"
          />
          <div className="flex flex-col gap-8 cursor-pointer">
            <div
              className="bg-slate-800 flex justify-center w-44 h-8 items-center rounded-2xl"
              onClick={navigateOrderManagement}
            >
              <p className="uppercase text-xs text-white">Completed</p>
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

            {["#11323e", "#11324f", "#11325g"].map((orderId) => (
              <section
                key={orderId}
                className="flex flex-col w-full my-5"
                onClick={() => openModal(orderId)}
              >
                <div className="flex bg-white py-10 px-10 shadow-md rounded-lg border-2 border-stone-400 justify-between items-center">
                  <p>ORDER {orderId}</p>
                  <p className="text-xs text-stone-400">CLICK TO VIEW</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-poppins">
          <div className="bg-white p-8 rounded-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>Details for Order {selectedOrder}</p>
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
