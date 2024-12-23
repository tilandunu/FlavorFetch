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

export function SupportTicket() {
  const [issue, setIssue] = useState("");
  const [issueType, setIssueType] = useState("");
  const responseMessage = "null";
  const [visibilityForm, setVisibilityForm] = useState("hidden");
  const [visibilityType, setVisibilityType] = useState("visible");

  const [issueError, setIssueError] = useState("");
  const [typeError, setTypeError] = useState("");

  const customerUID = Cookies.get("userID"); // Updated to match the cookie name

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIssueError("");
    setTypeError("");

    // Validation to ensure all fields are filled out
    if (!issueType) {
      setTypeError("Please select an issue type.");
    }
    if (!issue) {
      setIssueError("Please describe your issue.");
    }

    if (!issueType || !issue) {
      return; // If there are validation errors, exit the function
    }

    try {
      const user = auth.currentUser;

      if (user) {
        // Sending the ticket data to the backend
        await axios.post(`http://localhost:3001/api/tickets`, {
          customerUID, // Fixed key name
          issueType, // Included issueType
          issue,
          responseMessage,
          status: "Open", // Directly included the status
        });
      }

      toast.success("Ticket submitted successfully", {
        position: "top-center",
      });

      setVisibilityForm("hidden");
      setVisibilityType("visible");
    } catch (error) {
      toast.error("Failed to submit ticket. Please try again.", {
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
      <Card className="mx-16 shadow-2xl p-10">
        <form onSubmit={handleSubmit} className="border-2 border-black">
          <div className="flex gap-24 flex-row align-middle justify-center items-center">
            <div className="flex flex-col w-[600px] p-10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm text-slate-500 pb-6 font-extralight">
                  FlavorFetch Support
                </CardTitle>

                <div className={visibilityType}>
                  <CardDescription className="text-4xl text-black">
                    NEED HELP?
                  </CardDescription>
                  <CardDescription className="text-4xl text-red-600">
                    WE'RE HERE FOR YOU
                  </CardDescription>
                </div>
              </CardHeader>
              <div className={visibilityType}>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex justify-center">
                    <h1 className="text-[10px] font-inter pt-10 pb-4">
                      Select the type of support you need
                    </h1>
                  </div>
                  <div className={visibilityType}>
                    <div className="flex justify-center flex-col pb-5">
                      <Button
                        onClick={handleNext}
                        className="hover:bg-green-700 text-white duration-300"
                      >
                        New Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={visibilityForm}>
                <CardContent className="grid gap-6 py-1">
                  <div className="grid gap-2">
                    <Label htmlFor="issueType" className="text-[12px] pl-1">
                      Issue Type :
                    </Label>
                    <select
                      id="issueType"
                      value={issueType} // Bind value to state
                      onChange={(e) => setIssueType(e.target.value)}
                      className="border-[0.5px] border-black p-2 text-[12px]"
                      required
                    >
                      <option value="" disabled>
                        Select issue type
                      </option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Issue</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="issue" className="text-[12px] pl-1">
                      Issue :
                    </Label>
                    <Input
                      id="issue"
                      type="text"
                      value={issue} // Bind value to state
                      onChange={(e) => setIssue(e.target.value)}
                      className="placeholder:text-[10px] border-[0.5px] border-black"
                      required
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-6 py-6">
                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-green-700"
                  >
                    Submit Ticket
                  </Button>
                  <p
                    className="bg-white text-black hover:border-b-2 px-10 py-1 hover:cursor-pointer hover:border-black duration-300"
                    onClick={handleBack}
                  >
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
                src="/support2.png"
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
