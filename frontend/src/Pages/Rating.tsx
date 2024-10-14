import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

// Modal component for editing the user's rating
const Modal = ({
  show,
  onClose,
  onSubmit,
  editRating,
  editComment,
  setEditRating,
  setEditComment,
  loading,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Your Rating</h2>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              placeholder="Update your comment"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <select
              value={editRating}
              onChange={(e) => setEditRating(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value={0} disabled>
                Select Rating
              </option>
              <option value={1}>⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={5}>⭐⭐⭐⭐⭐</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#732d1d] text-white rounded-lg"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Rating = () => {
  const { recipeID } = useParams(); // Get recipeID from the URL
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(null); // Store user's own rating separately
  const [averageRating, setAverageRating] = useState(0); // Store the overall rating
  const customerUID = Cookies.get("userID"); // Get the customer UID from cookies
  const navigate = useNavigate();

  // Modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(0); // Store edited rating
  const [editComment, setEditComment] = useState(""); // Store edited comment

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/ratings/getRatings/${recipeID}`
        );
        const allRatings = response.data;

        // Separate user's rating from all other ratings
        const userReview = allRatings.find(
          (rating) => rating.customerUID === customerUID
        );
        if (userReview) {
          setUserRating(userReview); // Store user's rating separately
        }

        const filteredRatings = allRatings.filter(
          (rating) => rating.customerUID !== customerUID
        );
        setRatings(filteredRatings); // Store other ratings

        // Calculate the overall rating, including the user's rating if it exists
        const allSubmittedRatings = [...filteredRatings];
        if (userReview) allSubmittedRatings.push(userReview);

        if (allSubmittedRatings.length > 0) {
          const totalRating = allSubmittedRatings.reduce(
            (sum, r) => sum + r.rating,
            0
          );
          const avgRating = totalRating / allSubmittedRatings.length;
          setAverageRating(avgRating.toFixed(1)); // Keep one decimal point
        }
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
        if (error.response && error.response.status !== 404) {
          toast.error("Failed to fetch ratings.");
        }
      }
    };
    fetchRatings();
  }, [recipeID, customerUID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/ratings/add",
        {
          recipeID, // Use recipeID from useParams
          customerUID,
          rating,
          comment,
        }
      );
      if (response.status === 201) {
        toast.success("Rating added successfully!"); // Show success toast
        setRating(0);
        setComment("");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to add rating. Please try again."); // Show error toast
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  const handleEdit = (userRating) => {
    setIsEditing(true); // Open the modal
    setEditRating(userRating.rating);
    setEditComment(userRating.comment);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/ratings/update/${userRating._id}`,
        {
          rating: editRating,
          comment: editComment,
        }
      );
      if (response.status === 200) {
        toast.success("Rating updated successfully!");
        setIsEditing(false); // Close the modal
        window.location.reload(); // Reload page to reflect changes
      }
    } catch (err) {
      toast.error("Failed to update rating.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ratingID) => {
    // Show confirmation dialog before deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this rating?"
    );
    if (!confirmed) return; // Exit if the user cancels

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/ratings/delete/${ratingID}`
      );
      if (response.status === 200) {
        toast.success("Rating deleted successfully!"); // Show success toast
        // Refresh the page after deletion
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to delete rating. Please try again."); // Show error toast
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-start pt-10 px-20 gap-5 p-5 bg-stone-100 min-h-screen font-poppins">
      <ToastContainer />

      {/* Modal Component */}
      <Modal
        show={isEditing}
        onClose={() => setIsEditing(false)} // Close modal
        onSubmit={handleUpdate} // Handle form submission
        editRating={editRating}
        editComment={editComment}
        setEditRating={setEditRating}
        setEditComment={setEditComment}
        loading={loading}
      />

      <div className=" p-9 py-9  w-full bg-white shadow-md rounded-lg ">
        <div className="flex justify-between items-center">
          {" "}
          <h2 className="text-2xl font-semibold text-[#000000]">
            RECIPE RATINGS
          </h2>
          <a href="/rating_report">
          <button
          className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
              Go to Your Ratings
        </button>
        </a>
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={goBack}
          >
            arrow_back
          </span>
        </div>
      </div>

      <div className="bg-white p-5 py-10 mb-5 rounded-xl w-full shadow-md">
        <h3 className="text-sm font-light px-4">Overall Rating:</h3>
        <div className="flex items-center justify-between text-yellow-400 text-3xl mt-5 px-3">
          {"⭐".repeat(Math.floor(averageRating))}{" "}
          <span className="text-gray-700 text-lg font-light">
            ({averageRating}/5.0 based on{" "}
            {ratings.length + (userRating ? 1 : 0)} reviews)
          </span>
        </div>
      </div>

      {/* If the user hasn't submitted a rating, show the add review section */}
      {!userRating && (
        <div className="bg-white p-5 py-10 mb-5 rounded-xl w-full shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write your review or comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-5 py-2 border border-gray-300 rounded-lg placeholder:text-sm"
                required
              />
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value={0} disabled>
                  Select Rating
                </option>
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#732d1d] text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-[#5e2617]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex justify-center items-center w-full mb-5">
        <Separator
          orientation="horizontal"
          className="bg-stone-300 w-[1200px]"
        />
      </div>

      <div className="flex flex-col gap-10 w-full">
        {/* Display user's review separately */}
        {userRating && (
          <div>
            <p className="px-7 pt-6 pb-5 text-sm border-2 bg-stone-500 rounded-t-xl text-white">
              YOUR RATING
            </p>
            <section
              key={userRating._id}
              className="bg-white px-7 py-8 rounded-b-xl w-full shadow-md"
            >
              <div className="flex gap-2">
                <div className="flex-grow">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold">
                      {userRating.customer
                        ? `${userRating.customer.firstName} ${userRating.customer.lastName}`
                        : "Anonymous"}
                    </span>
                    <span className="text-gray-500">
                      {new Date(userRating.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between mt-5">
                    <div className="flex flex-col">
                      <div className="flex gap-1 text-yellow-400 mb-2">
                        {"⭐".repeat(userRating.rating)}
                      </div>
                      <p className="text-gray-700 break-words w-full pr-20">
                        {userRating.comment}
                      </p>
                    </div>
                    <div className="flex gap-5 cursor-pointer">
                      <span
                        className="material-symbols-outlined p-5 rounded-full shadow-md hover:bg-stone-700 duration-300 hover:text-stone-300"
                        onClick={() => handleEdit(userRating)} // Open edit modal
                      >
                        edit
                      </span>
                      <span
                        className="material-symbols-outlined p-5 rounded-full shadow-md hover:bg-red-700 duration-300 hover:text-stone-300"
                        onClick={() => handleDelete(userRating._id)} // Call delete function
                      >
                        delete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <Separator />

        {/* Display other users' ratings */}
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <section
              key={rating._id}
              className="bg-white px-7 py-8 rounded-xl w-full shadow-md"
            >
              <div className="flex gap-2">
                <div className="flex-grow">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold">
                      {rating.customer
                        ? `${rating.customer.firstName} ${rating.customer.lastName}`
                        : "Anonymous"}
                    </span>
                    <span className="text-gray-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col">
                      <div className="flex gap-1 text-yellow-400 mb-2">
                        {"⭐".repeat(rating.rating)}
                      </div>
                      <p className="text-gray-700 break-words w-full pr-20">
                        {rating.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Rating;
