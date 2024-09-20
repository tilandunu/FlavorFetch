import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const OrderManagementNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order data
  const navigate = useNavigate();

  const navigateOrderManagementNC = () => {
    navigate("/orderManagementNC");
  };

  const navigateOrderManagement = () => {
    navigate("/orderManagement");
  };

  const handleOpenModal = (orderId) => {
    setSelectedOrder(orderId); // Set the selected order data (could be more details)
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const navigateHome = () => {
    navigate("/home");
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
              className="bg-slate-200 flex justify-center w-44 h-8 items-center rounded-2xl"
              onClick={navigateOrderManagement}
            >
              <p className="uppercase text-xs text-black">Completed</p>
            </div>
            <div
              className="bg-slate-800  flex justify-center w-44 h-8 items-center rounded-2xl"
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

        <div className="flex flex-col w-[75%] px-32">
          <div className="flex flex-col">
            <div className="flex justify-between items-center my-20">
              <p className="text-2xl">ORDER DASHBOARD</p>
              <div className="flex gap-7">
                <span
                  className="material-symbols-outlined"
                  onClick={navigateHome}
                >
                  home
                </span>
              </div>
            </div>
            <section className="flex flex-col w-full my-5">
              <div
                className="flex bg-white py-9 px-10 shadow-md rounded-lg border-2 border-stone-400 justify-between items-center cursor-pointer"
                onClick={() => handleOpenModal("ORDER #11323e")}
              >
                <p>ORDER #11323e</p>
                <div className="flex gap-8">
                  <span className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300">
                    edit
                  </span>
                  <span className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300">
                    delete
                  </span>
                </div>
              </div>
            </section>
            <section className="flex flex-col w-full my-5">
              <div
                className="flex bg-white py-9 px-10 shadow-md rounded-lg border-2 border-stone-400 justify-between items-center cursor-pointer"
                onClick={() => handleOpenModal("ORDER #11323e")}
              >
                <p>ORDER #11323e</p>
                <div className="flex gap-8">
                  <span className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300">
                    edit
                  </span>
                  <span className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300">
                    delete
                  </span>
                </div>
              </div>
            </section>
            <section className="flex flex-col w-full my-5">
              <div
                className="flex bg-white py-9 px-10 shadow-md rounded-lg border-2 border-stone-400 justify-between items-center cursor-pointer"
                onClick={() => handleOpenModal("ORDER #11323e")}
              >
                <p>ORDER #11323e</p>
                <div className="flex gap-8">
                  <span className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300">
                    edit
                  </span>
                  <span className="material-symbols-outlined border-2 p-3 rounded-full hover:shadow-md hover:bg-slate-800 hover:text-white duration-300">
                    delete
                  </span>
                </div>
              </div>
            </section>
            {/* Repeat sections for additional orders */}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>{selectedOrder}</p>
            {/* Add more detailed order information here */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementNC;
