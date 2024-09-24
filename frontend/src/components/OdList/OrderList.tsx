/*import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./ordersList.css"; 
import Order from "../Orders/Order"; 

const URL = "http://localhost:3001/api/orders"; 

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.orders || []; // Ensure you're accessing the correct data structure
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentsRef = useRef();

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchHandler();
      setOrders(data);
      setNoResults(data.length === 0); // Update noResults based on fetched data
    };
    getOrders();
  }, []);
  
  

  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Orders Report",
    
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredOrders = data.filter((order) =>
        Object.values(order).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrders(filteredOrders);
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
            placeholder="Search order details"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {noResults ? (
          <div className="no-results">
            <p>No orders found</p>
          </div>
        ) : (
          <div ref={componentsRef} className="orders-list">
            <table className="orders-table">
              <thead>
                <tr>
                  
                  <th>Order ID</th> 
                 
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                
                  <th>Delivery Address</th>
                 
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 &&
                  orders.map((order) => <Order key={order._id} order={order} />)}
              </tbody>

            </table>
          </div>
        )}

        <div className="actions">
          <button className="print-button" onClick={handlePrint}>
            Download Report
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderList;
*/

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./ordersList.css";
import Order from "../Orders/Order";

const URL = "http://localhost:3001/api/orders";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
  const componentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchHandler();
      setOrders(data);
      setNoResults(data.length === 0);
    };
    getOrders();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Orders Report",
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredOrders = data.filter((order: any) =>
        Object.values(order).some((field: any) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrders(filteredOrders);
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
            placeholder="Search order details"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {noResults ? (
          <div className="no-results">
            <p>No orders found</p>
          </div>
        ) : (
          <div ref={componentsRef} className="orders-list">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Delivery Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 &&
                  orders.map((order) => <Order key={order._id} order={order} />)}
              </tbody>
            </table>
          </div>
        )}

        <div className="actions">
          <button className="print-button" onClick={handlePrint}>
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
