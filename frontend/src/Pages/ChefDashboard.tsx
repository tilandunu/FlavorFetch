import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ChefDashboard = () => {
  const navigate = useNavigate();

  const navigateAddRecipe = () => {
    navigate("/addRecipe");
  };

  const [firstName, setFirstName] = useState("");

  const tips = [
    "Keep abreast of the latest trends and incorporate popular ingredients or techniques into your recipes.",
    "Experiment with seasonal ingredients to create fresh and exciting dishes.",
    "Focus on presentation to make your dishes more appealing to customers.",
    "Keep your recipes simple and easy to follow for a wider audience.",
    "Continuously test and refine your recipes to maintain high quality.",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    const chefUID = Cookies.get("userID"); // Get the userID from the cookie

    console.log("Log is" + chefUID);

    if (chefUID) {
      axios
        .get(`http://localhost:3001/api/recipes/chef`, { params: { chefUID } })
        .then((response) => {
          setFirstName(response.data.firstName);
        })
        .catch((error) => {
          console.error("Error fetching chef data:", error);
        });
    }
  }, []);

  return (
    <div className="flex font-poppins bg-zinc-100 ">
      <div className="flex flex-col py-10 px-16 items-center gap-11">
        <img className="w-28 mt-10" src="/trans-black.svg" alt="" />
        <p className="mt-2 cursor-pointer hover:text-green-600 duration-700">
          VIEW RECIPES
        </p>
        <p className="cursor-pointer hover:text-green-600 duration-700">
          PROFILE MANAGEMENT
        </p>
        <p className="mt-32 text-red-600 cursor-pointer hover:text-red-700 duration-700">
          DELETE ACCOUNT
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <Separator orientation="vertical" className="h-[600px]" />
      </div>

      <div className="px-10 py-20">
        <div className="flex content-center align-middle items-center justify-between">
          <p className="text-4xl font-semibold text-amber-950 mx-2">
            Hi, {firstName}!
          </p>{" "}
          <p> </p>
          <div className="flex content-center align-middle justify-center items-center gap-4">
            <p className="flex mr-8 border-b-2 hover:border-black duration-500 cursor-pointer">
              LOGOUT
            </p>
          </div>
        </div>
        <div className="flex gap-14">
          <div>
            <div className="flex flex-col py-20 gap-5">
              <div
                className="flex gap-12 py-5 px-7 w-[600px] bg-white rounded-2xl shadow-md hover:bg-green-900 hover:text-white duration-500 cursor-pointer"
                onClick={navigateAddRecipe}
              >
                <span className="material-symbols-outlined text-green-600">
                  add_circle
                </span>
                <p>ADD RECIPE</p>
              </div>
              <div className="flex gap-12 py-5 px-7 w-[600px] bg-white rounded-2xl shadow-md  hover:bg-stone-700 hover:text-white duration-500 cursor-pointer">
                <span className="material-symbols-outlined cursor-pointer">
                  edit
                </span>
                <p>EDIT RECIPE</p>
              </div>
              <div className="flex gap-12 py-5 px-7 w-[600px] bg-white rounded-2xl shadow-md  hover:bg-red-950 hover:text-white duration-500 cursor-pointer">
                <span className="material-symbols-outlined text-red-600 cursor-pointer">
                  delete
                </span>
                <p>DELETE RECIPE</p>
              </div>
            </div>
            <div className="flex flex-col p-10 pt-4 bg-white rounded-2xl shadow-sm w-[600px]">
              <div className="flex justify-center">
                <p className="text-xs text-stone-400 my-1">TIPS</p>
              </div>

              <Slider {...settings}>
                {tips.map((tip, index) => (
                  <div key={index}>
                    <p className="text-sm text-center">{tip}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="p-14 flex flex-col items-center mt-5 rounded-3xl shadow-md bg-white cursor-default">
            <p className="text-2xl">YOUR TOP RATED RECIPES</p>
            <p className="text-xs text-stone-500">
              BASED ON RATINGS FROM THE USERS
            </p>
            <Separator className="mt-5 bg-black" />
            <div className="flex flex-col gap-10 py-20">
              <div className="flex justify-between w-72">
                <p className="flex">BUTTER CHICKEN</p>
                <div className="flex">
                  <span className="material-symbols-outlined text-yellow-400">
                    star
                  </span>
                  <p className="w-14 text-right">4.58</p>
                </div>
              </div>
              <div className="flex justify-between w-72">
                <p>CUTTLEFISH CURRY</p>
                <div className="flex">
                  <span className="material-symbols-outlined text-yellow-400">
                    star
                  </span>
                  <p className="w-14 text-right">4.2</p>
                </div>
              </div>
              <div className="flex justify-between w-72">
                <p>POTATO CURRY</p>
                <div className="flex">
                  <span className="material-symbols-outlined text-yellow-400">
                    star
                  </span>
                  <p className="w-14 text-right">3.62</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
