/*import React from "react";
import axios from "axios";
import "./orders.css";

function Order(props) {
  const {
    _id,
    totalAmount,
    paymentMethod,
    status,
    deliveryAddress,
  } = props.order; 

  const deleteHandler = async () => {
    console.log("Order ID to delete:", _id); // Check the value of _id
    try {
      await axios.delete(`http://localhost:3001/api/orders/${_id}`);
      console.log("Order deleted successfully");
      window.location.reload(); // Reload the page after delete
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Only display the row if the order status is "declined" or "delivered"
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
}

export default Order;
*/

import React from "react";
import axios from "axios";
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
      console.log("Order deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error);
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
