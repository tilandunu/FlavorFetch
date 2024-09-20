import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { CardFooter } from "@/components/ui/card";
import FlavorFooter from "@/components/FlavorFooter";
import FlavorHeader from "@/components/FlavorHeader";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipesAndChefs = async () => {
      try {
        // Fetching all recipes
        const recipeResponse = await axios.get(
          "http://localhost:3001/api/recipes/allRecipes"
        );
        const recipesData = recipeResponse.data;
        setRecipes(recipesData);

        // Get unique chefUIDs from recipes
        const chefUIDs = [
          ...new Set(recipesData.map((recipe) => recipe.chefUID)),
        ];

        // Fetching chef details based on unique chefUIDs
        const chefResponse = await axios.post(
          "http://localhost:3001/api/users/getChefsByUIDs",
          { chefUIDs } // send the chefUIDs array
        );
        const chefsData = chefResponse.data;

        // Convert chefs array to an object for easier access by chefUID
        const chefMap = chefsData.reduce((acc, chef) => {
          acc[chef.chefUID] = `${chef.firstName} ${chef.lastName}`;
          return acc;
        }, {});

        setChefs(chefMap);
      } catch (error) {
        console.error("Error fetching recipes or chefs:", error);
      }
    };
    fetchRecipesAndChefs();
  }, []);

  const handleGoToRecipe = (recipeId) => {
    navigate(`/recipePage/${recipeId}`);
  };

  return (
    <div className="font-poppins">
      <div className="flex gap-7 mx-16 my-10 justify-between">
        <div className="flex gap-7">
          <span className="material-symbols-outlined">home</span>
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-red-700 text-xl my-1">recipe</p>
        <p className="text-red-600 text-sm mb-1">/ˈrɛsɪpi/</p>
        <p className="text-stone-500 text-xs mb-3">noun</p>
        <p className="text-sm mb-1">
          a set of instructions for preparing a particular dish, including a
          list of the ingredients required.
        </p>
        <p className="text-stone-500 text-xs">
          "a traditional Yorkshire recipe"
        </p>
      </div>
      {/* <div className="flex items-center justify-center my-10">
        <Input className="w-1/2 border-2 border-gray-400"></Input>
      </div> */}
      <div className="flex justify-center gap-7 mt-20">
        <div className="bg-rose-900 w-32 h-10 flex items-center justify-center text-xs text-rose-100 rounded-2xl">
          <p>MAIN COURSES</p>
        </div>
        <div className="bg-stone-500 w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl">
          <p>DESSERTS</p>
        </div>
        <div className="bg-stone-500 w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl">
          <p>BEVERAGES</p>
        </div>
        <div className="bg-stone-500 w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl">
          <p>BREAKFAST</p>
        </div>
        <div className="bg-stone-500 w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl">
          <p>SALADS</p>
        </div>
        <div className="bg-stone-500 w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl">
          <p>SOUPS</p>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="flex gap-10 justify-center px-32 py-10 flex-wrap">
          {recipes.map((recipe) => (
            <section key={recipe._id} className="flex">
              <div className="flex flex-col bg-stone-200 rounded-3xl">
                <img
                  src={recipe.recipeImageUrl || "../defaultImage.jpg"}
                  alt="Recipe Image"
                  className="rounded-3xl w-30 h-30 object-cover p-3"
                  style={{ width: "300px", height: "300px" }}
                />
                <div className="flex justify-between px-3 items-center">
                  <p className="flex text-lg uppercase">{recipe.title}</p>
                  <p className="text-sm">{recipe.servingCount}</p>
                </div>
                <p className="px-3 text-xs relative bottom-1 text-stone-600">
                  {chefs[recipe.chefUID] || "Anonymous"}
                </p>
                <div className="flex px-3 mt-1">
                  <span className="material-symbols-outlined  text-sm text-orange-500">
                    star
                  </span>
                  <span className="material-symbols-outlined  text-sm text-orange-500">
                    star
                  </span>
                  <span className="material-symbols-outlined  text-sm text-orange-500">
                    star
                  </span>
                  <span className="material-symbols-outlined  text-sm text-orange-500">
                    star
                  </span>
                  <span className="material-symbols-outlined  text-sm text-orange-500">
                    star
                  </span>
                </div>
                <div
                  className="flex justify-end px-3 items-center align-middle mb-5"
                  onClick={() => handleGoToRecipe(recipe._id)}
                >
                  <p className="text-[10px] bg-stone-700 w-20 text-center py-1 rounded-3xl text-stone-300 hover:cursor-pointer">
                    GO TO &gt;
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="mt-32">
        <FlavorFooter />
      </div>
    </div>
  );
};

export default AllRecipes;
