import { useEffect, useState } from "react";
import FlavorFooter from "@/components/FlavorFooter";
import FlavorHeader from "@/components/FlavorHeader";
import Preference from "./Preference";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ForYou from "./ForYou";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const customerUID = Cookies.get("userID");

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userID");
    navigate("/signin");
  };

  useEffect(() => {
    // Fetch whether the customer has preferences
    const checkPreferences = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/preference/check/${customerUID}`
        );
        if (!res.data.exists) {
          setShowPreferences(true); // Show preferences if not set
        }
      } catch (error) {
        console.error("Error checking preferences:", error);
      }
    };

    checkPreferences();
  }, [customerUID]);

  return (
    <div className="font-poppins">
      <div
        className="bg-slate-200"
        style={{
          backgroundImage: `url("/new.jpg")`,
          backgroundSize: "130% auto", // Ensures the image covers the width fully and adjusts the height accordingly
          backgroundPosition: "top",
          minHeight: "100vh", // Ensure the background covers the full viewport height
        }}
      >
        <div className="flex justify-center">
          <img className="w-80" src="/trans-black.svg" alt="" />
        </div>

        <div className="absolute top-0 right-0 mx-20 my-10">
          <Button
            className="bg-red-700 text-white font-semibold text-sm w-32"
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        </div>

        <div className="py-20">
          <FlavorHeader />
        </div>

        {showPreferences && (
          <div className="flex flex-col justify-center items-center mx-16 px-10 py-10 mb-20 h-[600px] bg-white rounded-3xl gap-3">
            <p className="uppercase font-semibold border-b-2 border-black pb-2 w-72 text-center">
              CHOOSE YOUR PREFERENCES
            </p>
            <div>
              <Preference />
            </div>
          </div>
        )}

        <div className="flex mx-10 py-10 mb-20 h-[600px] bg-white rounded-3xl flex-col items-center">
          <p className="flex mb-5 font-semibold">FOR YOU</p>
          <Separator className="w-1/2" />
          <div>
            {" "}
            <ForYou />
          </div>
        </div>

        <div className="my-10 flex justify-center">
          <img src="./Banner 1.jpg" alt="" />
        </div>

        <FlavorFooter />
      </div>
    </div>
  );
};

export default Home;
