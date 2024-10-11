import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./Notification";

interface StockItem {
  _id: string;
  name: string;
  quantity: number;
}

function StockNotification() {
  const [lowStock, setLowStock] = useState<StockItem[] | null>([]);

  useEffect(() => {
    callGetLowStock();
  }, []);

  async function callGetLowStock() {
    try {
      let res = await axios.get("http://localhost:3001/api/ingredients/getLowStockItems");

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

  return (
    <div>
      <h1>This is the notification page</h1>
      <div>
        {lowStock && lowStock.length !== 0
          ? lowStock.map((stock) => (
              <Notification
                key={stock._id}
                name={stock.name}
                qty={stock.quantity}
              />
            ))
          : "Badu thiyanawa pako"}
      </div>
    </div>
  );
}

export default StockNotification;
