import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import FlavorFooter from "@/components/FlavorFooter";

const ForYou = () => {
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

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
    </div>
  );
};

export default ForYou;
