import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF library

// Custom modal component
const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative flex flex-col items-center bg-white p-10 rounded-lg shadow-lg z-10 w-screen mx-20">
        <span
          className="absolute top-2 right-2 text-black cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

const EditPreferences = () => {
  const [preferences, setPreferences] = useState({
    dietTypes: "",
    allergyInfo: [],
    variety: [],
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal
  const [step, setStep] = useState(1); // State to track the current step inside modal
  const [selectedVariety, setSelectedVariety] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const customerUID = Cookies.get("userID");

  // Fetch preferences and set initial state
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/preference/get/${customerUID}`
        );
        const data = response.data;
        setPreferences(data);
        setSelectedVariety(data.variety || []);
        setSelectedDiet(data.dietTypes || "");
        setSelectedAllergies(data.allergyInfo || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching preferences:", error);
        setLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/preference/delete/${customerUID}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting preferences:", error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preferenceData = {
      customerUID,
      dietTypes: selectedDiet,
      allergyInfo: selectedAllergies,
      variety: selectedVariety,
    };
    try {
      await axios.post(
        "http://localhost:3001/api/preference/update",
        preferenceData
      );
      closeModal(); // Close modal on successful submission
      window.location.reload(); // Refresh the page to see updated preferences
    } catch (error) {
      console.error("Error submitting preferences", error);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleVarietyClick = (variety) => {
    setSelectedVariety((prev) =>
      prev.includes(variety)
        ? prev.filter((item) => item !== variety)
        : [...prev, variety]
    );
  };

  const handleDietClick = (diet) => {
    setSelectedDiet(diet);
  };

  const handleAllergyClick = (allergy) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((item) => item !== allergy)
        : [...prev, allergy]
    );
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/profileCustomer");
  };

  // Generate PDF function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User Preferences Report", 20, 20);
    doc.setFontSize(12);

    // Add preferences to PDF
    doc.text(`Diet Type: ${preferences.dietTypes || "None"}`, 20, 40);
    doc.text(
      `Allergies: ${
        preferences.allergyInfo.length > 0
          ? preferences.allergyInfo.join(", ")
          : "None"
      }`,
      20,
      60
    );
    doc.text(
      `Varieties: ${
        preferences.variety.length > 0 ? preferences.variety.join(", ") : "None"
      }`,
      20,
      80
    );

    doc.save("UserPreferencesReport.pdf");
  };

  if (loading) {
    return <p>Loading preferences...</p>;
  }

  return (
    <div className="flex flex-col px-32 py-20">
      <div className="flex justify-between">
        <p className="text-3xl mb-4">MANAGE PREFERENCES</p>
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={handleBack}
        >
          arrow_back
        </span>
      </div>
      <Separator className="mb-14" />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <p>DIET TYPE:</p>
          <p className="uppercase">{preferences.dietTypes || "None"}</p>
        </div>
        <div className="flex justify-between">
          <p>ALLERGY INFO:</p>
          <p className="uppercase">
            {preferences.allergyInfo.length > 0
              ? preferences.allergyInfo.join(" | ")
              : "None"}
          </p>
        </div>
        <div className="flex justify-between">
          <p>VARIETY:</p>
          <p className="uppercase">
            {preferences.variety.length > 0
              ? preferences.variety.join(" | ")
              : "None"}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-48 gap-10">
        <div
          className="flex items-center p-4 bg-stone-100 rounded-full hover:bg-black hover:text-white duration-500 cursor-pointer"
          onClick={handleEdit}
        >
          <span className="material-symbols-outlined">edit</span>
        </div>
        <div
          className="flex items-center p-4 bg-stone-100 rounded-full hover:bg-black hover:text-white duration-500 cursor-pointer"
          onClick={handleDelete}
        >
          <span className="material-symbols-outlined">delete</span>
        </div>
        {/* Generate Report Button */}
        <div
          className="flex items-center p-4 bg-stone-100 rounded-full hover:bg-black hover:text-white duration-500 cursor-pointer"
          onClick={generatePDF}
        >
          <span className="material-symbols-outlined">download</span>
          <p className="ml-2">Generate Report</p>
        </div>
      </div>

      {/* Custom Modal for editing preferences */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        {/* Modal content starts here */}
        <div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="flex flex-col font-poppins items-center gap-8 mt-10">
                <p>SELECT YOUR FAVORITE VARIETY</p>
                <div className="flex gap-10">
                  {[
                    "American",
                    "Chinese",
                    "Indian",
                    "Italian",
                    "Lankan",
                    "Mexican",
                  ].map((variety) => (
                    <div
                      key={variety}
                      onClick={() => handleVarietyClick(variety)}
                      className="relative flex flex-col items-center gap-7 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={`./preference/variety/${variety.toLowerCase()}.png`}
                          alt={variety}
                          className={`rounded-full object-cover transition-all duration-1000 w-[150px] h-[150px] hover:shadow-md ${
                            selectedVariety.includes(variety)
                              ? "grayscale brightness-50"
                              : ""
                          }`}
                        />
                        {selectedVariety.includes(variety) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                            <p className="text-white text-lg font-bold">
                              Selected
                            </p>
                          </div>
                        )}
                      </div>
                      <p>{variety.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col font-poppins items-center gap-8 mt-10">
                <p>SELECT YOUR DIET TYPE</p>
                <div className="flex gap-10">
                  {["Vegan", "Paleo", "Mixed"].map((diet) => (
                    <div
                      key={diet}
                      onClick={() => handleDietClick(diet)}
                      className="relative flex flex-col items-center gap-7 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={`./preference/diet/${diet.toLowerCase()}.png`}
                          alt={diet}
                          className={`rounded-full object-cover transition-all duration-1000 w-[150px] h-[150px] hover:shadow-md ${
                            selectedDiet === diet
                              ? "grayscale brightness-75"
                              : ""
                          }`}
                        />
                        {selectedDiet === diet && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                            <p className="text-white text-lg font-bold">
                              Selected
                            </p>
                          </div>
                        )}
                      </div>
                      <p>{diet.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col font-poppins items-center gap-8 mt-10">
                <p>SELECT YOUR ALLERGY TYPE</p>
                <div className="flex gap-10">
                  {["Dairy-Free", "Nut-Free", "Soy-Free", "Sugar-Free"].map(
                    (allergy) => (
                      <div
                        key={allergy}
                        onClick={() => handleAllergyClick(allergy)}
                        className="relative flex flex-col items-center gap-7 cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={`./preference/allergy/${allergy
                              .toLowerCase()
                              .replace("-", "")}.png`}
                            alt={allergy}
                            className={`rounded-full object-cover transition-all duration-100 w-[150px] h-[150px] hover:shadow-md ${
                              selectedAllergies.includes(allergy)
                                ? "grayscale brightness-75"
                                : ""
                            }`}
                          />
                          {selectedAllergies.includes(allergy) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                              <p className="text-white text-lg font-bold">
                                Selected
                              </p>
                            </div>
                          )}
                        </div>
                        <p>{allergy.toUpperCase()}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center gap-8 mt-10">
                <p className="text-lg font-bold">Review your preferences</p>
                <p className="mb-10">Submit your preferences to proceed.</p>
                <button
                  type="submit"
                  className="w-40 bg-stone-500 text-stone-200 p-2 rounded-3xl hover:bg-orange-600 duration-500 uppercase text-sm font-semibold"
                >
                  Submit
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-40 bg-stone-300 text-black p-2 rounded-3xl hover:bg-black hover:text-white duration-500 uppercase text-sm font-semibold"
                >
                  Back
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-40 bg-stone-500 text-stone-200 p-2 rounded-3xl hover:bg-orange-600 duration-500 uppercase text-sm font-semibold"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default EditPreferences;
