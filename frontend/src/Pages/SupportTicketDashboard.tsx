import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SupportTicketDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-8">
        <div className="flex items-center space-x-2">
          <img
            src="/trans black.png"
            alt="FlavorFetch Logo"
            className="w-40 mb-8"
          />
          <h1 className="text-3xl font-bold text-brown-800">SUPPORT DESK</h1>
        </div>
        <div className="ml-auto">
          <Link to="/ticketUserAccount">
            <span className="text-xl font-semibold text-black cursor-pointer">
              Account
            </span>
          </Link>
        </div>
        <div className="flex space-x-4">
          {/* Add navigation links or icons here if needed */}
        </div>
      </div>

      {/* Welcome Section */}
      <Card className="w-full max-w-6xl bg-white shadow-lg mb-12 rounded-xl ">
        <CardHeader className="border border-black p-6flex items-center p-6 ">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-black ">
              WELCOME TO FLAVOR FETCH SUPPORT SERVICES
            </CardTitle>
            <CardDescription className="text-sm text-black  mt-2">
              Should you wish to connect with us, please fill the support ticket
              form. We are constantly updating this site to provide up-to-date
              services for you.
            </CardDescription>
          </div>
          <img src="../girl.jpg" alt="Support" className="w-32 h-32 ml-6" />
        </CardHeader>
      </Card>

      {/* Buttons */}
      <div className="  bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-12  mt-8  ml-96">
        <Link to="/Feedback">
          <button className="bg-amber-100 text-brown-800 border border-black font-semibold py-4 px-6  rounded-full  shadow-md hover:shadow-lg  hover:bg-amber-300 text-black">
            FEEDBACK
            <p className="text-xs text-white-500 mt-1   ">
              View feedback our customers provided
            </p>
          </button>
        </Link>
        <Link to="/SupportTicket">
          <button className="bg-amber-100 text-brown-800 border border-black  font-semibold py-4 px-6  rounded-full shadow-md hover:shadow-lg hover:bg-amber-300 text-black duration-300">
            CUSTOMER SUPPORT
            <p className="text-xs text-white-500 mt-1   text-black">
              Get in touch for help{" "}
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
