/*import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "../OdList/ordersList.css"; 
import OrderSum from "./OrderSum"; 

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

function OrderSumList() { 
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentsRef = useRef();

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchHandler();
      setOrders(data);
    };
    getOrders();
  }, []);

 

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
                  orders.map((order) => <OrderSum key={order._id} order={order} />)} 
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default OrderSumList;
*/


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../OdList/ordersList.css";
import OrderSum from "./OrderSum";

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

const OrderSumList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
  const componentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchHandler();
      setOrders(data);
    };
    getOrders();
  }, []);

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
                  orders.map((order) => <OrderSum key={order._id} order={order} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSumList;
