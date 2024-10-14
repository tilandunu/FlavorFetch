import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming react-toastify is used for toast notifications

const ProfileCustomer = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [showPreferences, setShowPreferences] = useState(false);

  const navigate = useNavigate();
  const customerUID = Cookies.get("userID");

  const handleLogout = () => {
    Cookies.remove("userID");
    navigate("/signin");
  };

  const navigateHome = () => {
    navigate("/home"); // Change this to your desired route
  };

  const navigatePreferences = () => {
    if (showPreferences) {
      navigate("/editpreference");
    } else {
      toast.error("No preferences found. Please set your preferences first.");
    }
  };

  const navigateFavorites = () => {
    navigate("/favRecipes");
  };

  const navigateRatings = () => {
    navigate("/ratingReport");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (customerUID) {
        const docRef = doc(db, "Users", customerUID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            email: data.email || "",
          });
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User ID is not available in the cookies");
      }
    };

    // Check if customer has preferences
    const checkPreferences = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/preference/check/${customerUID}`
        );
        setShowPreferences(res.data.exists); // Set state based on whether preferences exist
      } catch (error) {
        console.error("Error checking preferences:", error);
      }
    };

    fetchUserData();
    checkPreferences();
  }, [customerUID]);

  return (
    <div className="bg-[#d8d8d8] p-2 font-poppins">
      <div className="h-screen bg-[#ececec] rounded-lg flex justify-between px-20 py-20">
        <div className="flex flex-col items-center gap-10">
          <img src="../trans black.png" alt="" className="w-28 mb-10" />
          <div className="flex flex-col gap-10">
            <Button className="bg-stone-600 w-44" onClick={navigatePreferences}>
              YOUR PREFERENCES
            </Button>
            <Button className="bg-stone-600 w-44" onClick={navigateFavorites}>
              YOUR FAVORITES
            </Button>
            <Button className="bg-stone-600 w-44" onClick={navigateRatings}>
              YOUR RATINGS
            </Button>
          </div>
        </div>

        <div className="flex">
          <Separator
            orientation="vertical"
            className="bg-stone-300 h-[500px]"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="flex text-6xl text-[#717171] mr-96">YOUR PROFILE</p>
            <div className="flex items-center gap-5 cursor-pointer">
              <span
                className="material-symbols-outlined"
                onClick={navigateHome}
              >
                home
              </span>{" "}
              <Button
                className="bg-[#CC3838] text-white w-44"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-10 my-12">
            <div className="flex flex-col">
              <p className="flex px-4 text-[#323232] text-sm pb-1">
                FIRST NAME
              </p>
              <div className="bg-[#ffffff] rounded-lg px-5 py-3">
                <p className="text-black">{userData.firstName}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="flex px-4 text-[#323232] text-sm pb-1">LAST NAME</p>
              <div className="bg-[#ffffff] rounded-lg px-5 py-3">
                <p className="text-black">{userData.lastName}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="flex px-4 text-[#323232] text-sm pb-1">
                PHONE NUMBER
              </p>
              <div className="bg-[#ffffff] rounded-lg px-5 py-3">
                <p className="text-black">{userData.phoneNumber}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="flex px-4 text-[#323232] text-sm pb-1">
                EMAIL ADDRESS
              </p>
              <div className="bg-[#ffffff] rounded-lg px-5 py-3">
                <p className="text-black">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomer;
