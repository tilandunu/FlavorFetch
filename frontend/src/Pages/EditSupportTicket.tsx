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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface EditSupportTicketProps {
  ticket: {
    customerUID: string; // Use customerUID instead of id
    issue: string;
    issueType: string;
    responseMessage: string;
    status: string;
  };
  onClose: () => void;
}

export function EditSupportTicket({ ticket, onClose }: EditSupportTicketProps) {
  const [issue, setIssue] = useState(ticket.issue);
  const [issueType, setIssueType] = useState(ticket.issueType);
  const responseMessage = "null";

  const customerUID = Cookies.get("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (user) {
        // Update existing ticket using customerUID
        await axios.put("http://localhost:3001/api/tickets", {
          customerUID,
          issueType,
          issue,
          responseMessage,
          status: "Open",
        });
        toast.success("Ticket updated successfully", {
          position: "top-center",
        });
      }

      onClose(); // Close the edit modal or form
    } catch (error) {
      toast.error("Failed to update ticket. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="py-8 font-poppins">
      <Card className="mx-16 shadow-2xl p-10">
        <form onSubmit={handleSubmit} className="border-2 border-black">
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm text-slate-500 pb-6 font-extralight">
              Edit Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 py-1">
            <div className="grid gap-2">
              <Label htmlFor="issueType" className="text-[12px] pl-1">
                Issue Type :
              </Label>
              <select
                id="issueType"
                value={issueType}
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
                value={issue}
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
              Update Ticket
            </Button>
            <Button
              type="button"
              className="bg-white text-black hover:border-b-2 border-black duration-300"
              onClick={onClose}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
