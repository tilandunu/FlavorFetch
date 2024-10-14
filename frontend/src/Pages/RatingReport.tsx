import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas

const RatingReport = () => {
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerUID = Cookies.get("userID"); // Get the current user ID from cookies
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        // Fetch all ratings by the current user
        const response = await axios.get(
          `http://localhost:3001/api/ratings/user/${customerUID}`
        );
        setUserRatings(response.data); // Set the ratings data
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        toast.error("Failed to fetch user ratings.");
      } finally {
        setLoading(false);
      }
    };

    if (customerUID) {
      fetchUserRatings();
    }
  }, [customerUID]);

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Function to download the table as a PDF
  const downloadPDF = async () => {
    const input = document.getElementById("ratings-table"); // Get the table element
    const canvas = await html2canvas(input); // Convert the table to canvas
    const imgData = canvas.toDataURL("image/png"); // Get image data from the canvas

    const pdf = new jsPDF("l", "mm", "a4"); // Create a new PDF document
    const imgWidth = 290; // Set the image width
    const pageHeight = pdf.internal.pageSize.height; // Get page height
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate the image height
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight); // Add the image to PDF
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight); // Add image to the new page
      heightLeft -= pageHeight;
    }

    pdf.save("User_Ratings_Report.pdf"); // Save the PDF
  };

  return (
    <div className="flex flex-col items-start pt-10 px-20 gap-5 p-5 bg-stone-100 min-h-screen font-poppins">
      <ToastContainer />

      <div className="p-9 py-9 w-full bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#000000]">Your Ratings</h2>
          <span className="material-symbols-outlined cursor-pointer" onClick={goBack}>
            arrow_back
          </span>
        </div>
        <button
          onClick={downloadPDF}
          className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Download as PDF
        </button>
      </div>

      <div className="flex justify-center items-center w-full mb-5">
        <Separator orientation="horizontal" className="bg-stone-300 w-[1200px]" />
      </div>

      {/* If still loading, show a loader */}
      {loading ? (
        <div>Loading your ratings...</div>
      ) : userRatings.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table id="ratings-table" className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b text-left">Recipe Name</th>
                <th className="py-3 px-4 border-b text-left">Rating</th>
                <th className="py-3 px-4 border-b text-left">Comment</th>
                <th className="py-3 px-4 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {userRatings.map((rating) => (
                <tr key={rating._id}>
                  <td className="py-2 px-4 border-b text-left">{rating.recipeName || "Recipe"}</td>
                  <td className="py-2 px-4 border-b text-left">
                    <div className="flex gap-1 text-yellow-400">
                      {"⭐".repeat(rating.rating)} {/* Adjusted to repeat stars */}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-left break-words">{rating.comment}</td>
                  <td className="py-2 px-4 border-b text-left">
                    {new Date(rating.createdAt).toLocaleDateString()} {/* Correct date format */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-700">You have not submitted any ratings yet.</div>
      )}
    </div>
  );
};

export default RatingReport;
