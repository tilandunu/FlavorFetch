import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
import "./orders.css";

interface OrderProps {
  order: {
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    deliveryAddress: string;
  };
}

const Order: React.FC<OrderProps> = (props) => {
  const { _id, totalAmount, paymentMethod, status, deliveryAddress } = props.order;

  const deleteHandler = async () => {
    console.log("Order ID to delete:", _id); 
    try {
      await axios.delete(`http://localhost:3001/api/orders/${_id}`);
      toast.success("Order deleted successfully!", { position: "top-center" });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.", { position: "top-center" });
    }
  };

  if (status !== "Cancelled" && status !== "Delivered") {
    return null;
  }

  return (
    <tr>
      <td>{_id}</td>
      <td>{totalAmount}</td>
      <td>{paymentMethod}</td>
      <td>{status}</td>
      <td>{deliveryAddress}</td>
      <td className="order-actions">
        <button className="delete-button" onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Order;
