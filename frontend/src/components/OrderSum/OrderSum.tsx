import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Orders/orders.css";

interface OrderSumProps {
  order: {
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    deliveryAddress: string;
    customerUID: string; 
  };
}

const OrderSum: React.FC<OrderSumProps> = (props) => {
  const { _id, totalAmount, paymentMethod, status, deliveryAddress, customerUID } = props.order;

  const confirmOrder = async () => {
    try {
     
      const response = await axios.get(`http://localhost:3001/api/deliveryOrders/${_id}`);
      
      if (response.data) {
        
        alert("Order is already confirmed for delivery.");
      } else {
       
        await axios.post("http://localhost:3001/api/deliveryOrders", {
          orderId: _id,
          customerId: customerUID,
          deliveryAddress,
        });
        alert("Order confirmed for delivery.");
      }
    } catch (error: unknown) {
    
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
         
          try {
            await axios.post("http://localhost:3001/api/deliveryOrders", {
              orderId: _id,
              customerId: customerUID,
              deliveryAddress,
            });
            alert("Order confirmed for delivery.");
          } catch (err) {
            console.error("Failed to confirm order", err);
            alert("Order is already confirmed");
          }
        } else {
          console.error("Failed to check order confirmation status", error);
          alert("Failed to check order confirmation status.");
        }
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred.");
      }
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
          Update
        </Link></td>
        <td>
        <button onClick={confirmOrder} className="confirm-button">
          Confirm
        </button>
      </td>
    </tr>
  );
};

export default OrderSum;
