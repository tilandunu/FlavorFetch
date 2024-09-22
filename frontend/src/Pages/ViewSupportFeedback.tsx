import { useEffect, useState } from "react";
import axios from "axios";
import { EditSupportFeedback } from "./EditSupportFeedback"; // Uncomment when ready
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Feedback {
  customerUID: string;
  message: string;
}

export function ViewSupportFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editFeedbackId, setEditFeedbackId] = useState<string | null>(null);
  const [updatedMessage, setUpdatedMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/feedback");
        setFeedbacks(response.data);
      } catch (error) {
        setError("Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleEdit = (feedback: Feedback) => {
    setEditFeedbackId(feedback.customerUID);
    setUpdatedMessage(feedback.message);
  };

  const handleSaveEdit = async () => {
    if (editFeedbackId) {
      try {
        const updatedFeedback = {
          message: updatedMessage,
        };
        const response = await axios.put(
          `http://localhost:3001/api/feedback`, // Update endpoint with customerUID
          updatedFeedback
        );
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((feedback) =>
            feedback.customerUID === editFeedbackId ? response.data : feedback
          )
        );
        setEditFeedbackId(null); // Exit edit mode
      } catch (error) {
        console.error("Failed to update feedback", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditFeedbackId(null);
  };

  const handleDelete = async (feedbackId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/feedback`); // Use feedbackId in the endpoint
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.customerUID !== feedbackId)
      );

      toast.success("Feedback deleted successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to delete feedback", error);
    }
  };

  navigate("/ViewSupportFeedback");

  const generatePDF = async (feedback: Feedback) => {
    const doc = new jsPDF();

    // Create a canvas for the PDF content
    const canvas = await html2canvas(
      document.querySelector(`#feedback-${feedback.customerUID}`) as HTMLElement
    );
    const imgData = canvas.toDataURL("image/png");

    // Add the image to the PDF
    doc.addImage(imgData, "PNG", 10, 10, 190, 0); // X, Y, Width, Height (Height is auto-scaled)

    // Save the PDF
    doc.save(`Feedback_${feedback.customerUID}.pdf`);
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
        My Feedback
        <Link
          to="/TicketUserAccount"
          className="text-black  text-right col-span-1 text-2xl"
        >
          Back
        </Link>
      </h1>
      {editFeedbackId ? (
        <EditSupportFeedback
          feedback={
            feedbacks.find(
              (feedback) => feedback.customerUID === editFeedbackId
            )!
          }
          onClose={handleCancelEdit}
        />
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((feedback, index) => (
            <li
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-lg bg-amber-100"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                Feedback from {feedback.customerUID}
              </h2>
              <p className="mt-2 text-gray-700">{feedback.message}</p>
              <div className="flex space-x-4 mt-4">
                <Link
                  to="/EditSupportFeedback" // Use the customer's UID in the URL
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleEdit(feedback)} // Trigger edit
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(feedback.customerUID)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => generatePDF(feedback)} // Generate PDF
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Download PDF
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
