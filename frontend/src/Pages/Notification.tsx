import { Button } from "@/components/ui/button";
import React from "react";

interface NotificationProps {
  name: string;
  qty: number;
}

const Notification: React.FC<NotificationProps> = (props) => {
  return (
    <div>
      <div className="flex flex-col shadow-xl rounded-lg ">
        <h1 className="bg-gray-600 text-white px-4 py-4 rounded-lg text-center">
          Low Stock Alert: Action Required
        </h1>
        <div className="flex flex-row justify-between items-center my-5 mx-10">
          <div className="flex mx-2 justify-center items-center">
            <h3 className="my-4 mx-2">
              <div className="flex-col w-96 ">
                {" "}
                <div className="flex flex-row justify-between">
                  {" "}
                  <p>We are currently low on: </p>
                  <p> {props.name}</p>
                </div>
                <div className="flex flex-row justify-between">
                  {" "}
                  <p>The available quantity is: </p>
                  <p>{props.qty}</p>
                </div>
              </div>
            </h3>
          </div>
          <div>
            <Button className="bg-green-600">
              <span className="material-symbols-outlined ">check</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
