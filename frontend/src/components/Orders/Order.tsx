import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import "./orders.css";

interface DeliveryOrderProps {
  deliveryOrder: {
    _id: string;
    orderId: string;
    customerId: string;
    deliveryAddress: string;
    createdAt: string;
    note?: string;
    estimatedTime?: string;
  };
}

const Order: React.FC<DeliveryOrderProps> = (props) => {
  const { _id, customerId, deliveryAddress, note, estimatedTime } = props.deliveryOrder;

 
  const [deliveryNote, setDeliveryNote] = useState(note || "");
  const [deliveryEstimatedTime, setDeliveryEstimatedTime] = useState(estimatedTime || "");
  
  const [error, setError] = useState(""); 

  // special characters in the note
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Frontend Validation 
  const validateForm = () => {
    if (!deliveryNote) {
      setError("Note is required");
      toast.error("Note is required", { position: "top-center" });
      return false;
    }
    if (specialCharRegex.test(deliveryNote)) {
      setError("Note cannot contain special characters");
      toast.error("Note cannot contain special characters", { position: "top-center" });
      return false;
    }
    if (!deliveryEstimatedTime) {
      setError("Estimated delivery time is required");
      toast.error("Estimated delivery time is required", { position: "top-center" });
      return false;
    }
    if (isNaN(Number(deliveryEstimatedTime))) {
      setError("Estimated time should be a valid number");
      toast.error("Estimated time should be a valid number", { position: "top-center" });
      return false;
    }
    setError(""); 
    return true;
  };

  const deleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this delivery order?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/deliveryOrders/${_id}`);
        toast.success("Delivery order deleted successfully!", { position: "top-center" });
        window.location.reload(); // Refresh 
      } catch (error) {
        console.error("Error deleting delivery order:", error);
        toast.error("Failed to delete delivery order.", { position: "top-center" });
      }
    }
  };

  const submitHandler = async () => {
    if (validateForm()) {
      try {
      
        const updatedOrder = {
          note: deliveryNote,
          estimatedTime: deliveryEstimatedTime,
        };
        await axios.put(`http://localhost:3001/api/deliveryOrders/${_id}`, updatedOrder);
        toast.success("Delivery order updated successfully!", { position: "top-center" });
        
      } catch (error) {
        console.error("Error updating delivery order:", error);
        toast.error("Failed to update delivery order.", { position: "top-center" });
      }
    }
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{customerId}</td>
      <td>{deliveryAddress}</td>
      <td>
        <input
          type="text"
          value={deliveryNote}
          onChange={(e) => setDeliveryNote(e.target.value)}
          placeholder="Add note"
        />
      </td>
      <td>
        <input
          type="text"
          value={deliveryEstimatedTime}
          onChange={(e) => setDeliveryEstimatedTime(e.target.value)}
          placeholder="Add estimated time"
        />
      </td>
      <td className="order-actions">
      <div>
        <button className="update-button" onClick={submitHandler}>
          Submit
        </button>
        <br /> 
        <button className="delete-button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </td>

    </tr>
  );
};

export default Order;
