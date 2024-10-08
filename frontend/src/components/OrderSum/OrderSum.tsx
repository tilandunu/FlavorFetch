import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Import Axios for API requests
import "../Orders/orders.css";

interface OrderSumProps {
  order: {
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    deliveryAddress: string;
    customerUID: string; // Added customerUID to send it to DeliveryOrder model
  };
}

const OrderSum: React.FC<OrderSumProps> = (props) => {
  const { _id, totalAmount, paymentMethod, status, deliveryAddress, customerUID } = props.order;

  const confirmOrder = async () => {
    try {
      // POST request to store the order in DeliveryOrder model
      await axios.post("http://localhost:3001/api/deliveryOrders", {
        orderId: _id,
        customerId: customerUID,
        deliveryAddress,
      });
      alert("Order confirmed for delivery.");
    } catch (error) {
      console.error("Failed to confirm order", error);
      alert("Failed to confirm order.");
    }
  };
  
  return (
    <tr>
      <td>{_id}</td>
      <td>{totalAmount}</td>
      <td>{paymentMethod}</td>
      <td>{status}</td>
      <td>{deliveryAddress}</td>
      <td className="order-actions">
        <Link to={`/orderdetails/${_id}`} className="update-button">
          Update Status
        </Link>
        <button onClick={confirmOrder} className="confirm-button">
          Confirm
        </button>
      </td>
    </tr>
  );
};

export default OrderSum;
