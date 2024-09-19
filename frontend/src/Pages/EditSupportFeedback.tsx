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

interface EditSupportFeedbackProps {
  feedback: {
    customerUID: string; // Use customerUID instead of id
    message: string;
  };
  onClose: () => void;
}

export function EditSupportFeedback({
  feedback,
  onClose,
}: EditSupportFeedbackProps) {
  const [message, setMessage] = useState(feedback.message);

  const responseMessage = "null"; // You may want to adjust this

  const customerUID = Cookies.get("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (user) {
        // Update existing feedback using customerUID
        await axios.put("http://localhost:3001/api/feedback", {
          customerUID,

          message,
          responseMessage,
          status: "Open",
        });
        toast.success("Feedback updated successfully", {
          position: "top-center",
        });
      }

      onClose(); // Close the edit modal or form
    } catch (error) {
      toast.error("Failed to update feedback. Please try again.", {
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
              Edit Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 py-1">
            <div className="grid gap-2">
              <Label htmlFor="message" className="text-[12px] pl-1">
                Message:
              </Label>
              <Input
                id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              Update Feedback
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
