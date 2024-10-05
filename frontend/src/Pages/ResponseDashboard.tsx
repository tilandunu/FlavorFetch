import { useEffect, useState } from "react";
import axios from "axios";

interface Ticket {
  customerUID: string;
  issueType: string;
  issue: string;
  responseMessage: string;
  status: string;
}

export function ResponseDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>("");
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.issue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResponse = async (ticketId: string) => {
    try {
      await axios.put(`http://localhost:3001/api/admin/tickets`, {
        customerUID: ticketId,
        responseMessage: responseText,
        status: "Closed",
      });
      // Optionally, you can refetch tickets or update state
      setTickets(
        tickets.map((ticket) =>
          ticket.customerUID === ticketId
            ? { ...ticket, status: "Closed", responseMessage: responseText }
            : ticket
        )
      );
      setCurrentTicketId(null);
      setResponseText("");
    } catch (error) {
      console.error("Failed to respond to ticket", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by issue type or issue..."
          className="border border-gray-300 p-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="space-y-4">
        {filteredTickets.map(
          (
            ticket // Use filteredTickets here
          ) => (
            <li
              key={ticket.customerUID}
              className="border border-gray-300 p-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold">{ticket.issueType}</h2>
              <p>{ticket.issue}</p>
              <p>Status: {ticket.status}</p>
              {ticket.responseMessage && (
                <p>Response: {ticket.responseMessage}</p>
              )}
              <button
                onClick={() => {
                  setCurrentTicketId(ticket.customerUID);
                  setResponseText(""); // Reset response text
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Respond
              </button>

              {currentTicketId === ticket.customerUID && (
                <div>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response here..."
                    className="border border-gray-400 p-2 w-full mt-2"
                  />
                  <button
                    onClick={() => handleResponse(ticket.customerUID)}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Submit Response
                  </button>
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
