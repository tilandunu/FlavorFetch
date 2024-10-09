import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf"; 
import "jspdf-autotable"; 
import "./ordersList.css";
import Order from "../Orders/Order";

const URL = "http://localhost:3001/api/deliveryOrders"; 

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.deliveryOrders || []; 
  } catch (error) {
    console.error("Error fetching delivery orders:", error);
    return [];
  }
};

const DeliveryOrderList: React.FC = () => {
  const [deliveryOrders, setDeliveryOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const getDeliveryOrders = async () => {
      const data = await fetchHandler();
      setDeliveryOrders(data);
      setNoResults(data.length === 0);
    };
    getDeliveryOrders();
  }, []);

  
  const downloadPDF = async () => {
    const doc = new jsPDF(); 
    const tableColumn = ["Delivery ID", "Customer ID", "Delivery Address", "Note", "Estimated Time"]; // Column headers
    const tableRows: string[][] = [];

  
    deliveryOrders.forEach((order) => {
      const orderData = [
        order._id,
        order.customerId,
        order.deliveryAddress,
        order.note || "N/A", 
        order.estimatedTime || "N/A", 
      ];
      tableRows.push(orderData);
    });

    // Generate the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Delivery Orders Report", 14, 15); // Title of the PDF
    doc.save("delivery_orders_report.pdf"); 
  };

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredOrders = data.filter((order: any) =>
        Object.values(order).some((field: any) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDeliveryOrders(filteredOrders);
      setNoResults(filteredOrders.length === 0);
    });
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="search-bar">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search delivery order details"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {noResults ? (
          <div className="no-results">
            <p>No delivery orders found</p>
          </div>
        ) : (
          <div className="orders-list">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Delivery ID</th>
                  <th>Customer ID</th>
                  <th>Delivery Address</th>
                  <th>Add Note</th>
                  <th>Add Estimated Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveryOrders.length > 0 &&
                  deliveryOrders.map((deliveryOrder) => (
                    <Order
                      key={deliveryOrder._id}
                      deliveryOrder={deliveryOrder}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="actions">
          <button className="download-button" onClick={downloadPDF}>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrderList;
