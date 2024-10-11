import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

interface StockItem {
  _id: string;
  name: string;
  quantity: number;
}

function StockNotification() {
  const [lowStock, setLowStock] = useState<StockItem[] | null>([]);
  const navigate = useNavigate();

  useEffect(() => {
    callGetLowStock();
  }, []);

  async function callGetLowStock() {
    try {
      let res = await axios.get(
        "http://localhost:3001/api/ingredients/getLowStockItems"
      );

      if (res) {
        console.log(res);
        if (res.status === 215) {
          setLowStock(res.data);
        } else if (res.status === 315) {
          setLowStock(null);
        }
      } else {
        console.log("Server error");
      }
    } catch (error) {
      console.warn(error);
    }
  }

  const goHome = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="font-poppins bg-gray-200 p-1 cursor-default">
        <div className="bg-white m-10 py-10 h-screen rounded-2xl p-10 shadow-md">
          <div className="flex my-10 justify-between mr-5 items-center">
            <h1 className="flex uppercase text-3xl font-semibold text-blue-950 mx-10">
              NOTIFICATIONS
            </h1>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={goHome}
            >
              home
            </span>
          </div>
          <div>
            {lowStock && lowStock.length !== 0
              ? lowStock.map((stock) => (
                  <Notification
                    key={stock._id}
                    name={stock.name}
                    qty={stock.quantity}
                  />
                ))
              : "Stocks are available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockNotification;
