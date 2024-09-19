import { Separator } from "@/components/ui/separator";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecipePage = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  };

  const navigateAllRecipes = () => {
    navigate("/allrecipes");
  };

  return (
    <div className="font-poppins">
      <div className="flex gap-7 mx-16 my-10 justify-between">
        <div className="flex gap-7 hover:cursor-pointer">
          <span className="material-symbols-outlined" onClick={navigateHome}>
            home
          </span>
          <span
            className="material-symbols-outlined"
            onClick={navigateAllRecipes}
          >
            arrow_back
          </span>
        </div>
        <span className="material-symbols-outlined">shopping_cart</span>
      </div>
      <div className="flex justify-center gap-32">
        <div className="flex flex-col items-end mt-12">
          <img
            src="../chefDashboard.jpeg"
            alt="Recipe Image"
            className="rounded-3xl w-30 h-30 object-cover"
            style={{ width: "350px", height: "350px" }}
          />
          <p className="text-3xl mt-7 font-medium">CRISPY FRIED CHICKEN</p>
          <p className="text-sm relative bottom-1 mb-4 text-stone-500">
            Adam Perera
          </p>
          <p className="flex text-orange-700 text-lg">SERVES : 4</p>
        </div>
        <div className="flex flex-col">
          <Separator orientation="vertical" className="bg-black opacity-50" />
        </div>

        <div className="flex flex-col items-center">
          <p className="flex mt-10 ">MAIN COURSE | AMERICAN | PALEO</p>
          <p className="text-orange-700 text-sm my-2">
            "Golden crispy fried chicken with a deliciously seasoned crust"
          </p>
          <div className="flex gap-10 mt-10 mb-5">
            <div className="flex flex-col items-end">
              <p className="flex text-xs">PREP TIME</p>
              <p className="flex text-4xl">15 MIN</p>
            </div>
            <div>
              <Separator
                orientation="vertical"
                className="bg-black opacity-50"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="flex text-xs">COOK TIME</p>
              <p className="flex text-4xl">15 MIN</p>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-10">
            <p className="text-teal-600 text-sm my-2">
              ORDER THESE INGREDIENTS DIRECTLY
            </p>
            <div className="flex flex-col gap-2 my-10">
              <div className="flex gap-4">
                <span className="material-symbols-outlined">add_circle</span>
                <p className="uppercase">Chicken</p>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined">add_circle</span>
                <p className="uppercase">Flour</p>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined">add_circle</span>
                <p className="uppercase">Egg</p>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined">add_circle</span>
                <p className="uppercase">Oil</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <p className="text-teal-600">ADDITIONAL INGREDIENTS: </p>
            <p>SALT | PEPPER | BUTTERMILK</p>
          </div>
        </div>
      </div>
      <div className="flex mx-10 mt-32 mb-20">
        <Separator className="bg-black" />
      </div>
      <div className="flex justify-between ml-40 my-28">
        <div className="w-full border-2 border-black p-10">
          <p className="flex font-light text-3xl mb-6">INSTRUCTIONS</p>
          <div className="flex flex-col text-sm gap-3 font-normal">
            <p> 1. SEASON THE CHICKEN WITH SALT, PEPPER AND PAPRIKA</p>
            <p>
              {" "}
              2. DIP THE CHICKEN PIECES INTO THE BUTTERMILK AND EGG MIXTURE
            </p>
            <p> 3. COAT THE CHICKEN IN FLOUR</p>
            <p> 4. FRY THE CHICKEN IN HOT OIL UNTIL GOLDEN AND CRISPY</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full my-4 justify-center">
          <span className="material-symbols-outlined">arrow_upward</span>
          <p>BACK TO TOP</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
