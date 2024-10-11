import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function TicketUserAccount() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full h-full py-20 max-w-7xl bg-white shadow-xl rounded-lg p-8 flex justify-between">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-200 p-6">
          <div className="mb-12 flex flex-col items-center">
            <img
              src="/trans black.png"
              alt="FlavorFetch Logo"
              className="w-40 mb-8"
            />
            <div className="flex flex-col gap-5 items-left">
              <Link
                to="/SupportTicket"
                className="text-base font-semibold text-gray-700 rounded-md border px-5 py-3 hover:bg-stone-500 hover:text-slate-200 duration-300"
              >
                CREATE TICKET
              </Link>

              <Link
                to="/Feedback"
                className="text-base font-semibold text-gray-700 rounded-md border px-5 py-3 hover:bg-stone-500 hover:text-slate-200 duration-300"
              >
                FFEDBACK MANAGEMENT
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col p-6 gap-10">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-red-800">MY ACCOUNT</h1>
            <div className="flex items-center space-x-6">
              <Link to="" className="text-gray-600 hover:text-black"></Link>
              <Link
                to="/SupportTicketDashboard"
                className="text-gray-600 hover:text-black hover:border-b-2"
              >
                BACK
              </Link>
            </div>
          </div>

          {/* Cards */}

          <div className="flex gap-10">
            <Link to="/viewMyTickets">
              <Card className=" border border-black p-6 text-center  text-white-500 mt-1 bg-red-50 hover:bg-red-700 hover:text-white text-black duration-300 w-60">
                <CardContent>
                  <h2 className="text-lg font-semibold ">VIEW TICKETS</h2>
                </CardContent>
              </Card>
            </Link>

            <Link to="/viewMyTickets">
              <Card className="border border-black p-6 text-center  text-white-500 mt-1 bg-red-50 hover:bg-red-700 hover:text-white text-black duration-300 w-60">
                <CardContent>
                  <h2 className="text-lg font-semibold">EDIT TICKETS</h2>
                </CardContent>
              </Card>
            </Link>

            <Link to="/viewMyTickets">
              <Card className="border border-black p-6 text-center  text-white-500 mt-1 bg-red-50 hover:bg-red-700 hover:text-white text-black duration-300 w-60">
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
