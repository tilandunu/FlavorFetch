import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";
import Cookies from "js-cookie"; // Importing the js-cookie library
import { useNavigate } from "react-router-dom";

const ProfileOther = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the userID cookie
    Cookies.remove("userID");
    // Navigate to the login or home page
    navigate("/signin"); // Change this to your desired route
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Retrieve the user ID from the cookie
      const userId = Cookies.get("userID");

      if (userId) {
        // Fetch user data from Firestore
        const docRef = doc(db, "Users", userId);
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

    fetchUserData();
  }, []);

  return (
    <div className="bg-[#d8d8d8] p-2 font-poppins">
      <div className="h-screen bg-[#ececec] rounded-lg flex justify-between px-20 py-20">
        <div className="flex flex-col items-center gap-10">
          <img src="../trans black.png" alt="" className="w-28 mb-10" />
        </div>

        <div className="flex">
          <Separator orientation="vertical" className="bg-black h-[500px]" />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="flex text-6xl text-[#717171] mr-96">YOUR PROFILE</p>
            <Button
              className="bg-[#CC3838] text-white w-44"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
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

export default ProfileOther;
