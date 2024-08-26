import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



interface Ticket {
    _id: string;
    issue: string;
    issueType: string;
    status: string;
    responseMessage?: string;
    createdAt: string;
  }

export function ViewMyTickets() {
  const [tickets, setTickets] = useState([]);
  const customerID = Cookies.get("customerID");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tickets", {
          params: { customerID },
        });

        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error.message);
      }
    };

    fetchTickets();
  }, [customerID]);

  return (
    <div className="py-8 font-poppins">
      <Card className="mx-16 shadow-2xl p-10 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-4 border border-gray-300 rounded-md"
                >
                  <h2 className="text-lg font-semibold">Issue: {ticket.issue}</h2>
                  <p className="text-sm">Type: {ticket.issueType}</p>
                  <p className="text-sm">Status: {ticket.status}</p>
                  {ticket.responseMessage && (
                    <p className="text-sm">Response: {ticket.responseMessage}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Submitted on: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <Button className="mt-6 w-full bg-black hover:bg-green-700">
          Submit Another Ticket
        </Button>
      </Card>
    </div>
  );
}*/
