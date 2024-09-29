import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Preference = () => {
  const [step, setStep] = useState(1); // State to track the current step
  const [selectedVariety, setSelectedVariety] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const nextStep = () => {
    if (step < 4) setStep(step + 1); // Increment step but not beyond 4
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1); // Decrement step but not below 1
  };

  const handleVarietyClick = (variety) => {
    setSelectedVariety((prev) => {
      if (prev.includes(variety)) {
        return prev.filter((item) => item !== variety);
      } else {
        return [...prev, variety];
      }
    });
  };

  const handleDietClick = (diet) => {
    setSelectedDiet(diet);
  };

  const handleAllergyClick = (allergy) => {
    setSelectedAllergies((prev) => {
      if (prev.includes(allergy)) {
        return prev.filter((item) => item !== allergy);
      } else {
        return [...prev, allergy];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerUID = Cookies.get("userID"); // Assuming customerUID is stored in the cookie

    const preferenceData = {
      customerUID: customerUID,
      dietTypes: selectedDiet,
      allergyInfo: selectedAllergies,
      variety: selectedVariety,
    };

    try {
      await axios.post(
        "http://localhost:3001/api/preference/create",
        preferenceData
      ); // Replace with your backend route
      console.log("Preferences submitted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting preferences", error);
    }
  };

  return (
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
                  {/* Wrapper div with relative positioning */}
                  <div className="relative">
                    {/* Image */}
                    <img
                      src={`./preference/variety/${variety.toLowerCase()}.png`}
                      alt={variety}
                      className={`rounded-full object-cover transition-all duration-1000 w-[150px] h-[150px] hover:shadow-md ${
                        selectedVariety.includes(variety)
                          ? "grayscale brightness-50"
                          : ""
                      }`}
                    />
                    {/* "Selected" overlay text */}
                    {selectedVariety.includes(variety) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <p className="text-white text-lg font-bold">Selected</p>
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
                  {/* Wrapper div with relative positioning */}
                  <div className="relative">
                    {/* Image */}
                    <img
                      src={`./preference/diet/${diet.toLowerCase()}.png`}
                      alt={diet}
                      className={`rounded-full object-cover transition-all duration-1000 w-[150px] h-[150px] hover:shadow-md ${
                        selectedDiet === diet ? "grayscale brightness-75" : ""
                      }`}
                    />
                    {/* "Selected" overlay text */}
                    {selectedDiet === diet && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <p className="text-white text-lg font-bold">Selected</p>
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
                    {/* Wrapper div with relative positioning */}
                    <div className="relative">
                      {/* Image */}
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
                      {/* "Selected" overlay text */}
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
  );
};

export default Preference;
