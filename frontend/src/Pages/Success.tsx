import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home"); // Navigate back to home
  };

  return (
    <div className="flex justify-center items-center h-screen font-poppins">
      <div className="text-center">
        <span className="material-symbols-outlined text-8xl text-green-500 mb-10">
          verified
        </span>
        <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
        <p className="mt-4">Thank you for your purchase.</p>
        <button
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg uppercase  font-semibold hover:bg-stone-700 hover:text-stone-200 duration-500"
          onClick={handleReturnHome}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
