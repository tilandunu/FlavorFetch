import axios from "axios";
import { useEffect, useState } from "react";
import SupplyNotification from "./SupplyNotification";
import { useNavigate } from "react-router-dom";

// Define the type for supply data
interface Supply {
  _id: string;
  ingredientName: string;
  quantity: number;
}

function PendingSuppliesNotification() {
  const [pendingSupplies, setPendingSupplies] = useState<Supply[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    callGetPendingSupplies();
  }, []);

  async function callGetPendingSupplies() {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/supplyOrder/getPendingSupplies"
      );
      if (res.status === 215) {
        setPendingSupplies(res.data);
      } else if (res.status === 315) {
        console.log("No pending supplies");
      }
    } catch (error) {
      console.warn(error);
    }
  }

  // Function to handle status update to "Approved" when the "Noted" button is clicked
  async function handleApproveStatus(supplyId: string) {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/supplyOrder/orders/${supplyId}`,
        {
          status: "Approved",
        }
      );

      if (res.status === 200) {
        // Refresh the list of pending supplies after updating the status
        callGetPendingSupplies();
      } else {
        console.log("Failed to update the status");
      }
    } catch (error) {
      console.warn("Error updating supply status:", error);
    }
  }

  // Function to handle status update to "Rejected" when the "Cancel" button is clicked
  async function handleRejectStatus(supplyId: string) {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/supplyOrder/orders/${supplyId}`,
        {
          status: "Rejected",
        }
      );

      if (res.status === 200) {
        // Refresh the list of pending supplies after updating the status
        callGetPendingSupplies();
      } else {
        console.log("Failed to update the status");
      }
    } catch (error) {
      console.warn("Error updating supply status:", error);
    }
  }

  const goHome = () => {
    navigate(-1);
  };

  return (
    <div className="font-poppins bg-gray-200 p-1">
      <div className="bg-white m-10 py-10 h-screen rounded-2xl p-10 shadow-md">
        {" "}
        <div className="flex my-10 justify-between mr-5 items-center">
          <h1 className="flex uppercase text-3xl font-semibold text-blue-950">
            Pending supplies
          </h1>
          <span className="material-symbols-outlined" onClick={goHome}>
            home
          </span>
        </div>
        <div>
          {pendingSupplies.length !== 0
            ? pendingSupplies.map((supply) => (
                <SupplyNotification
                  key={supply._id}
                  name={supply.ingredientName}
                  qty={supply.quantity}
                  onApprove={() => handleApproveStatus(supply._id)} // Pass the approve handler
                  onReject={() => handleRejectStatus(supply._id)} // Pass the reject handler
                />
              ))
            : "There's no pending supplies right now"}
        </div>
      </div>
    </div>
  );
}

export default PendingSuppliesNotification;
