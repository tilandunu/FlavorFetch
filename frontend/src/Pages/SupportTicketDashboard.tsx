import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SupportTicketDashboard() {
  const navigate = useNavigate();

  const gohome = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 font-poppins cursor-default">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-1">
        <div className="flex items-center gap-10">
          <div className="flex items-center">
            {" "}
            <img
              src="/trans black.png"
              alt="FlavorFetch Logo"
              className="w-40"
            />
          </div>

          <h1 className="text-3xl font-bold text-red-800">SUPPORT DESK</h1>
        </div>
        <div className="ml-auto flex items-center gap-8">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={gohome}
          >
            home
          </span>
          <div className="flex bg-slate-300 p-2 px-6 rounded-lg hover:bg-slate-900 hover:text-slate-300 duration-500">
            {" "}
            <Link to="/ticketUserAccount">
              <span className=" font-semibold cursor-pointer uppercase text-sm">
                VIEW DETAILS
              </span>
            </Link>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Add navigation links or icons here if needed */}
        </div>
      </div>

      {/* Welcome Section */}
      <Card className="w-full max-w-6xl bg-white shadow-lg mb-1 rounded-xl ">
        <CardHeader className="border border-black flex items-center p-10 ">
          <div className="flex flex-col items-center">
            <CardTitle className="text-xl font-semibold text-black ">
              WELCOME TO FLAVOR FETCH SUPPORT SERVICES
            </CardTitle>
            <CardDescription className="text-sm text-black  mt-2 mb-4">
              Should you wish to connect with us, please fill the support ticket
              form. We are constantly updating this site to provide up-to-date
              services for you.
            </CardDescription>
          </div>
          <img src="../girl.jpg" alt="Support" className="w-36 h-40" />
        </CardHeader>
      </Card>

      {/* Buttons */}
      <div className="flex gap-10 mt-10">
        <Link to="/Feedback">
          <button className="bg-amber-100 text-brown-800 border border-black font-semibold py-4 px-6 w-96 rounded-full  shadow-md hover:shadow-lg  hover:bg-amber-300 text-black duration-300">
            FEEDBACK
            <p className="text-xs  text-stone-600  ">
              View feedback our customers provided
            </p>
          </button>
        </Link>
        <Link to="/SupportTicket">
          <button className="bg-amber-100 text-brown-800 border border-black  font-semibold py-4 px-6 w-96 rounded-full shadow-md hover:shadow-lg hover:bg-amber-300 text-black duration-300">
            CUSTOMER SUPPORT
            <p className="text-xs text-stone-600">Get in touch for help </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
