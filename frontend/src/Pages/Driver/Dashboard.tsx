import React, { useState, useEffect } from "react";
import Menubar from "../../components/DriverDash/Menubar";
import MenuToggle from "../../components/DriverDash/MenuToggle";
import Navbar from "../../components/DriverDash/Navbar";
import Card from "../../components/DriverDash/Dashboard-card";
import { reedem, service, users, revenue } from "../../assets/index";
import OrderSumList from "../../components/OrderSum/OrderSumList";
import axios from "axios";

const DriverDashboard: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [orderCount, setOrderCount] = useState<number>(0);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Fetch the total order count from the backend
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/orders/count"
        );
        setOrderCount(response.data.count);
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div
          className={`w-1/4 h-full bg-gray-200 ${
            showMenu ? "" : "hidden"
          } lg:block`}
        >
          <Menubar />
        </div>
        <div className="flex-1 sm:relative">
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="h-16 bg-white shadow-md">
            <Navbar pagename={"Dashboard"} />
          </div>
          <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={`${orderCount}`}
                subtitle={"Total number of orders"}
                icon={revenue}
                color={"bg-gradient-to-r from-cyan-500 to-blue-500"}
              />
            </div>

            {/* Other Cards */}
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={"10"}
                subtitle={"Completed Orders"}
                icon={reedem}
                color={"bg-gradient-to-r from-purple-500 to-pink-500"}
              />
            </div>

            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={"5"}
                subtitle={"In Progress"}
                icon={service}
                color={"bg-gradient-to-r from-amber-400 to-amber-600"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={"35"}
                subtitle={"To-Be-Delivered"}
                icon={users}
                color={"bg-gradient-to-r from-lime-400 to-lime-600"}
              />
            </div>
          </div>

          <div>
            <OrderSumList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
