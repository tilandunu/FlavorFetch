/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in!");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {userDetails ? (
        <div className="pt-8 pb-28 bg-[#F5EDF0]">
          <div className="flex flex-col justify-evenly">
            <div className="flex gap-[30px] justify-between mx-32 align-middle items-center pt-16 pb-10 px-0">
              <div className="flex ml-8 gap-5 justify-center items-center align-middle font-poppins text-[#3D2C2E]">
                <p className="text-[40px] font-poppins">BONJOUR</p>
                <p className="text-[40px]  font-light  uppercase">
                  {userDetails.firstName}!
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex justify-center gap-5 mr-4">
                  <Button className="bg-[#424C55] w-28" onClick={handleLogout}>
                    SIGNOUT
                  </Button>

                  <Link to={"/createBlog"}>
                    {" "}
                    <Button className="bg-[#424C55] w-28"> HOME </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col font-light">
              <div className="flex flex-col mx-32 mb-12 p-5 shadow-xl">
                <p className="flex text-[25px] font-poppins text-white font-light py-4 pl-[20px] mt-6 mb-6 bg-[#886F68]">
                  Your Details
                </p>
                <div className="flex flex-col p-5">
                  <p className="flex text-[12px] font-poppins">FIRST NAME :</p>
                  <p className="flex font-poppins font-light">
                    {userDetails.firstName}
                  </p>
                </div>
                <div className="flex flex-col p-5">
                  <p className="flex text-[12px] font-poppins">LAST NAME :</p>
                  <p className="flex font-poppins font-light">
                    {" "}
                    {userDetails.lastName}
                  </p>
                </div>
                <div className="flex flex-col p-5">
                  <p className="flex text-[12px] font-poppins">EMAIL :</p>
                  <p className="flex font-poppins font-light">
                    {userDetails.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center overscroll-none overflow-hidden">
          <div className="flex justify-center">
            <div className="flex flex-col space-y-3 ">
              <div className="flex flex-col items-center justify-center gap-6 mt-32 mb-20">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-[300px] w-[900px] rounded-xl" />
              <div className="flex flex-col gap-6 ">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-[125px] w-[400px] rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
