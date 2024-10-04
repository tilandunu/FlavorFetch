import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import FlavorFooter from "@/components/FlavorFooter";
import Cookies from "js-cookie";

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const customerUID = Cookies.get("userID");

  useEffect(() => {
    const fetchFavoriteRecipesAndChefs = async () => {
      try {
        // Fetch favorite recipes by customerUID
        const recipeResponse = await axios.get(
          `http://localhost:3001/api/favorites/favoriteRecipes/${customerUID}`
        );
        const favoriteRecipes = recipeResponse.data;
        setRecipes(favoriteRecipes);

        // Get unique chefUIDs from favorite recipes
        const chefUIDs = [
          ...new Set(favoriteRecipes.map((recipe) => recipe.chefUID)),
        ];

        // Fetch chef details for those chefUIDs
        const chefResponse = await axios.post(
          "http://localhost:3001/api/users/getChefsByUIDs",
          { chefUIDs }
        );
        const chefsData = chefResponse.data;

        const chefMap = chefsData.reduce((acc, chef) => {
          acc[chef.chefUID] = `${chef.firstName} ${chef.lastName}`;
          return acc;
        }, {});
        setChefs(chefMap);
      } catch (error) {
        console.error("Error fetching favorite recipes or chefs:", error);
      }
    };

    fetchFavoriteRecipesAndChefs();
  }, [customerUID]);

  const handleGoToRecipe = (recipeId) => {
    navigate(`/recipePage/${recipeId}`);
  };

  const handleGoToHome = () => {
    navigate(`/home`);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesQuery = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedCategory === "" || recipe.type === selectedCategory; // Changed 'recipe.category' to 'recipe.type'
    return matchesQuery && matchesType;
  });

  return (
    <div className="font-poppins">
      <div className="flex gap-7 mx-16 my-10 justify-between">
        <div className="flex gap-7">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={handleGoToHome}
          >
            home
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-red-700 text-5xl my-1 uppercase">Favorites</p>

        <div className="flex items-center mt-7">
          {" "}
          <Input
            className="w-[600px] border-2 border-gray-400 placeholder:text-left pl-10 rounded-3xl"
            placeholder="search for recipes"
            value={searchQuery} // Bind input to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          ></Input>
          <span class="material-symbols-outlined relative right-10">
            search
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-7 mt-20">
        <div
          className={`${
            selectedCategory === "Main Courses" ? "bg-rose-900" : "bg-stone-500"
          } w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl cursor-pointer`}
          onClick={() => setSelectedCategory("Main Courses")}
        >
          <p>MAIN COURSES</p>
        </div>
        <div
          className={`${
            selectedCategory === "Desserts" ? "bg-rose-900" : "bg-stone-500"
          } w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl cursor-pointer`}
          onClick={() => setSelectedCategory("Desserts")}
        >
          <p>DESSERTS</p>
        </div>
        <div
          className={`${
            selectedCategory === "Beverages" ? "bg-rose-900" : "bg-stone-500"
          } w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl cursor-pointer`}
          onClick={() => setSelectedCategory("Beverages")}
        >
          <p>BEVERAGES</p>
        </div>
        <div
          className={`${
            selectedCategory === "Breakfast" ? "bg-rose-900" : "bg-stone-500"
          } w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl cursor-pointer`}
          onClick={() => setSelectedCategory("Breakfast")}
        >
          <p>BREAKFAST</p>
        </div>
        <div
          className={`${
            selectedCategory === "Salads" ? "bg-rose-900" : "bg-stone-500"
          } w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl cursor-pointer`}
          onClick={() => setSelectedCategory("Salads")}
        >
          <p>SALADS</p>
        </div>
        <div
          className={`${
            selectedCategory === "Soups" ? "bg-rose-900" : "bg-stone-500"
          } w-32 h-10 flex items-center justify-center text-xs text-white rounded-2xl cursor-pointer`}
          onClick={() => setSelectedCategory("Soups")}
        >
          <p>SOUPS</p>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="flex gap-10 justify-center px-32 py-10 flex-wrap">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
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
            ))
          ) : (
            <p>No recipes found</p> // Display message if no recipes match the search query
          )}
        </div>
      </div>
      <div className="mt-32">
        <FlavorFooter />
      </div>
    </div>
  );
};

export default FavoriteRecipes;
