import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Feedback() {
  const [message, setMessage] = useState("");

  const [visibilityForm, setVisibilityForm] = useState("hidden");
  const [visibilityType, setVisibilityType] = useState("visible");

  const customerUID = Cookies.get("userId"); // Updated to match the cookie name

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validation to ensure all fields are filled out

    try {
      const user = auth.currentUser;

      if (user) {
        // Sending the ticket data to the backend
        await axios.post(`http://localhost:3001/api/feedback`, {
          customerUID: customerUID, // Use the actual customerUID from the cookie
          message: message, // Fixed key name
          // Directly included the status
        });
      }

      toast.success("Feedback submitted successfully", {
        position: "top-center",
      });

      setVisibilityForm("hidden");
      setVisibilityType("visible");
    } catch (error) {
      toast.error("Failed to submit Feedback. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setVisibilityForm("visible");
    setVisibilityType("hidden");
  };

  const handleBack = () => {
    setVisibilityForm("hidden");
    setVisibilityType("visible");
  };

  return (
    <div className="py-8 font-poppins">
      <Card className="mx-16 shadow-2xl p-10 ">
        <form onSubmit={handleSubmit} className="border-2 border-black">
          <div className="flex gap-24 flex-row align-middle justify-center items-center">
            <div className="flex flex-col w-[600px] p-10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm text-slate-500 pb-6 font-extralight">
                  FlavorFetch Feedback
                </CardTitle>

                <div className={visibilityType}>
                  <CardDescription className="text-4xl text-black">
                    WANT TO GIVE FEEDBACK?
                  </CardDescription>
                </div>
              </CardHeader>
              <div className={visibilityType}>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex justify-center">
                    <h1 className="text-[10px] font-inter pt-10 pb-4">
                      We are happy to recive your feedback
                    </h1>
                  </div>
                  <div className={visibilityType}>
                    <div className="flex justify-center flex-col pb-5">
                      <Link to="/ViewSupportFeedback">
                        <Button className="hover:bg-green-700 text-white duration-300 w-full">
                          View Feedback
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className={visibilityType}>
                    <div className="flex justify-center flex-col pb-5">
                      <Button
                        onClick={(e) => handleNext(e)}
                        className="hover:bg-green-700 text-white duration-300 w-full"
                      >
                        Provide Feedback
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={visibilityForm}>
                <CardContent className="grid gap-6 py-1">
                  <div className="grid gap-2">
                    <Label htmlFor="message" className="text-[12px] pl-1">
                      Message :
                    </Label>
                    <Input
                      id="message"
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-[0.5px] border-black"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 py-6">
                  <Button className="w-full bg-black hover:bg-green-700">
                    Submit Feedback
                  </Button>
                  <p
                    className="bg-white text-black hover:border-b-2 px-10 py-1 hover:cursor-pointer hover:border-black duration-300"
                    onClick={handleBack}
                  >
                    {" "}
                    Back
                  </p>
                </CardFooter>
              </div>
              <div className="flex justify-end ">
                <p className="text-[13px]">
                  NEED TO GO BACK?{" "}
                  <Link
                    to={"/SupportTicketDashboard"}
                    className="px-[6px] text-red-500"
                  >
                    BACK
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end flex-row">
              <img
                src="../public/feedback.jpg"
                alt="support"
                className="w-[480px] h-[430px] rounded-[60px]"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
