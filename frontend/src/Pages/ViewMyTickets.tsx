// viewMyTickets.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { EditSupportTicket } from "./EditSupportTicket";
import { Link } from "react-router-dom";

interface Ticket {
  customerUID: string;
  issueType: string;
  issue: string;
  responseMessage: string;
  status: string;
}

export function ViewMyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editTicketId, setEditTicketId] = useState<string | null>(null);
  const [updatedIssueType, setUpdatedIssueType] = useState<string>("");
  const [updatedIssue, setUpdatedIssue] = useState<string>("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tickets");
        setTickets(response.data);
      } catch (error) {
        setError("Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (ticket: Ticket) => {
    setEditTicketId(ticket.customerUID);
    setUpdatedIssueType(ticket.issueType);
    setUpdatedIssue(ticket.issue);
  };

  const handleSaveEdit = async () => {
    if (editTicketId) {
      // Ensure it's not null
      try {
        const updatedTicket = {
          issueType: updatedIssueType,
          issue: updatedIssue,
        };
        const response = await axios.put(
          "http://localhost:3001/api/tickets", // Using customerUID directly
          updatedTicket
        );
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.customerUID === editTicketId ? response.data : ticket
          )
        );
        setEditTicketId(null); // Exit edit mode
      } catch (error) {
        console.error("Failed to update ticket", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditTicketId(null);
  };

  const handleDelete = async (ticketId: string) => {
    try {
      await axios.delete("http://localhost:3001/api/tickets");
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.customerUID !== ticketId)
      );
    } catch (error) {
      console.error("Failed to delete ticket", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="grid grid-cols-3 items-center space-x-4 text-5xl font-bold text-center mb-8 text-gray-800">
        <img
          src="/trans black.png"
          alt="FlavorFetch Logo"
          className="w-40 mb-8"
        />
        My Tickets
        <Link
          to="/TicketUserAccount"
          className="text-black  text-right col-span-1 text-2xl"
        >
          Back
        </Link>
      </h1>
      {editTicketId ? (
        <EditSupportTicket
          ticket={
            tickets.find((ticket) => ticket.customerUID === editTicketId)!
          }
          onClose={handleCancelEdit}
        />
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket, index) => (
            <li
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-lg bg-amber-100"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {ticket.issueType}
              </h2>
              <p className="mt-2 text-gray-700">{ticket.issue}</p>
              <p className="mt-4 text-sm font-medium">
                Status:{" "}
                <span
                  className={`${
                    ticket.status === "Open" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </p>
              {ticket.responseMessage && (
                <p className="mt-2 text-gray-500">
                  Response: {ticket.responseMessage}
                </p>
              )}
              <div className="flex space-x-4 mt-4">
                <Link
                  to="/EditSupportTicket" // Use the customer's UID in the URL
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(ticket.customerUID)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
