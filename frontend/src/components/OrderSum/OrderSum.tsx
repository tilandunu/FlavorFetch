/*import React from "react";
import { Link } from "react-router-dom"; 
import "../Orders/orders.css"; 

function OrderSum(props) {
  const {
    _id,
 
    totalAmount,
    paymentMethod,
    status,
 
    deliveryAddress,

  } = props.order; 
  


  

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
        
      </td>
    </tr>
  );
}

export default OrderSum;
*/


import React from "react";
import { Link } from "react-router-dom";
import "../Orders/orders.css";

interface OrderSumProps {
  order: {
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    deliveryAddress: string;
  };
}

const OrderSum: React.FC<OrderSumProps> = (props) => {
  const { _id, totalAmount, paymentMethod, status, deliveryAddress } = props.order;

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
      </td>
    </tr>
  );
};

export default OrderSum;
