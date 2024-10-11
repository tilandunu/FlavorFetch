import { Button } from "@/components/ui/button";
import React from "react";

// Define the type for the component props
interface SupplyNotificationProps {
  name: string;
  qty: number;
  onApprove: () => void; // Function to handle approval
  onReject: () => void; // Function to handle rejection
}

function SupplyNotification(props: SupplyNotificationProps) {
  return (
    <div className="flex flex-col shadow-xl rounded-lg ">
      <h1 className="bg-gray-600 text-white px-4 py-4 rounded-lg text-center">
        Pending Supplies Alert: Action Required
      </h1>
      <div className="flex flex-row justify-between items-center my-5 mx-10">
        <div className="flex mx-2 justify-center items-center">
          <h3 className="my-4 mx-2">
            <div className="flex-col w-96 ">
              {" "}
              <div className="flex flex-row justify-between">
                {" "}
                <p>Item: </p>
                <p> {props.name}</p>
              </div>
              <div className="flex flex-row justify-between">
                {" "}
                <p>Quantity:</p>
                <p>{props.qty}</p>
              </div>
            </div>
          </h3>
        </div>
        <div className="flex justify-center  mx-10 gap-10 items-center">
          <Button onClick={props.onApprove} className="bg-green-600">
            <span className="material-symbols-outlined ">check</span>
          </Button>
          <Button onClick={props.onReject} className="bg-red-500">
            <span className="material-symbols-outlined">close</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SupplyNotification;
