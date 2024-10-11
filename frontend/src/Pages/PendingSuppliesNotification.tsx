import axios from "axios";
import { useEffect, useState } from "react";
import SupplyNotification from "./SupplyNotification";

// Define the type for supply data
interface Supply {
    _id: string;
    ingredientName: string;
    quantity: number;
}

function PendingSuppliesNotification() {
    const [pendingSupplies, setPendingSupplies] = useState<Supply[]>([]);

    useEffect(() => {
        callGetPendingSupplies();
    }, []);

    async function callGetPendingSupplies() {
        try {
            const res = await axios.get('http://localhost:3001/api/supplyOrder/getPendingSupplies');
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
            const res = await axios.put(`http://localhost:3001/api/supplyOrder/orders/${supplyId}`, {
                status: "Approved",
            });

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
            const res = await axios.put(`http://localhost:3001/api/supplyOrder/orders/${supplyId}`, {
                status: "Rejected",
            });

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

    return (
        <div>
            <h1>This is the notification page for pending supplies</h1>
            <div>
                {pendingSupplies.length !== 0 ? (
                    pendingSupplies.map((supply) => (
                        <SupplyNotification 
                            key={supply._id} 
                            name={supply.ingredientName} 
                            qty={supply.quantity}
                            onApprove={() => handleApproveStatus(supply._id)} // Pass the approve handler
                            onReject={() => handleRejectStatus(supply._id)}   // Pass the reject handler
                        />
                    ))
                ) : (
                    "There's no pending supplies right now"
                )}
            </div>
        </div>
    );
}

export default PendingSuppliesNotification;
