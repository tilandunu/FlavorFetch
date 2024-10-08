import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
import "./orders.css";

interface DeliveryOrderProps {
  deliveryOrder: {
    _id: string;
    orderId: string;
    customerId: string;
    deliveryAddress: string;
    createdAt: string;
  };
}

const Order: React.FC<DeliveryOrderProps> = (props) => {
  const { _id, customerId, deliveryAddress, createdAt } = props.deliveryOrder;

  const deleteHandler = async () => {
    // Show a confirmation popup before proceeding with deletion
    const isConfirmed = window.confirm("Are you sure you want to delete this delivery order?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/deliveryOrders/${_id}`); // Ensure correct endpoint
        toast.success("Delivery order deleted successfully!", { position: "top-center" });
        window.location.reload(); // Refresh after successful deletion
      } catch (error) {
        console.error("Error deleting delivery order:", error); // Log full error
        toast.error("Failed to delete delivery order.", { position: "top-center" });
      }
    } else {
      toast.info("Delete action was cancelled", { position: "top-center" });
    }
  };

  return (
    <tr>
      <td>{_id}</td>
     
      <td>{customerId}</td>
      <td>{deliveryAddress}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td className="order-actions">
        <button className="delete-button" onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Order;
