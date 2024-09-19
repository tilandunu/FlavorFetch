import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function TicketUserAccount() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-8 flex">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-200 p-6">
          <div className="mb-12">
            <img
              src="/trans black.png"
              alt="FlavorFetch Logo"
              className="w-40 mb-8"
            />
            <ul className="space-y-6">
              <li>
                <Link
                  to="/SupportTicket"
                  className="text-lg font-semibold text-gray-700"
                >
                  CREATE TICKET
                </Link>
              </li>
              <li>
                <Link
                  to="/Feedback"
                  className="text-lg font-semibold text-gray-700"
                >
                  FFEDBACK MANAGEMENT
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-brown-800">MY ACCOUNT</h1>
            <div className="flex items-center space-x-6">
              <Link to="" className="text-gray-600 hover:text-black"></Link>
              <Link
                to="/SupportTicketDashboard"
                className="text-gray-600 hover:text-black"
              >
                BACK
              </Link>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-6">
            <Link to="/viewMyTickets">
              <Card className=" border border-black p-6 text-center  text-white-500 mt-1 bg-teal-50 hover:bg-red-700 hover:text-white text-black duration-300">
                <CardContent>
                  <h2 className="text-lg font-semibold ">VIEW TICKETS</h2>
                </CardContent>
              </Card>
            </Link>

            <Link to="/viewMyTickets">
              <Card className="border border-black p-6 text-center  text-white-500 mt-1 bg-teal-50 hover:bg-red-700 hover:text-white text-black duration-300">
                <CardContent>
                  <h2 className="text-lg font-semibold">EDIT TICKETS</h2>
                </CardContent>
              </Card>
            </Link>

            <Link to="/viewMyTickets">
              <Card className="border border-black p-6 text-center  text-white-500 mt-1 bg-teal-50 hover:bg-red-700 hover:text-white text-black duration-300">
                <CardContent>
                  <h2 className="text-lg font-semibold ">DELETE TICKETS</h2>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
