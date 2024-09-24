import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ChefViewRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const chefUID = Cookies.get("userID");

  useEffect(() => {
    // Fetch recipes by chefUID
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/recipes/chefRecipes?chefUID=${chefUID}`
        );
        const data = await response.json();

        if (response.ok) {
          setRecipes(data);
        } else {
          console.error("Error fetching recipes:", data.error);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateChefDashboard = () => {
    navigate("/chefDashboard");
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleEditRecipe = (recipeId) => {
    navigate(`/updateRecipe/${recipeId}`); // Navigate to the update recipe page with recipeId
  };

  const handleDeleteRecipe = async (recipeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/recipes/deleteRecipe/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe._id !== recipeId)
          );
          console.log("Recipe deleted successfully");
        } else {
          const errorData = await response.json();
          console.error("Error deleting recipe:", errorData.error);
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  return (
    <div className="font-poppins bg-stone-100 min-h-screen hover:cursor-default">
      <div className="flex justify-between items-center px-32 p-10">
        <div className="flex items-center gap-16">
          <img src="../trans black.png" alt="" className="w-20" />
          <p className="text-3xl font-normal">YOUR RECIPES</p>
        </div>

        <div className="flex gap-5 items-center">
          <span
            className="material-symbols-outlined hover:cursor-pointer"
            onClick={navigateChefDashboard}
          >
            home
          </span>
          <p className="flex mr-8 border-b-2 hover:border-black duration-500 cursor-pointer">
            LOGOUT
          </p>
        </div>
      </div>

      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <section
              key={recipe._id}
              className="flex items-center gap-6 mt-6 py-8 mx-20 px-24 rounded-3xl hover:shadow-xl duration-300 justify-between bg-white"
            >
              <div className="flex gap-10">
                <img
                  src={recipe.recipeImageUrl || "../chefDashboard.jpeg"}
                  alt="Recipe Image"
                  className="rounded-full w-30 h-30 object-cover p-0.5 border-2 hover:border-red-600 duration-1000"
                  style={{ width: "120px", height: "120px" }}
                />
                <div className="flex flex-col justify-center ml-10">
                  <p className="text-lg font-semibold">{recipe.title}</p>
                  <p
                    className="max-w-[500px] overflow-hidden text-stone-600 font-light text-sm"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      textOverflow: "ellipsis",
                    }}
                  >
                    {recipe.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div
                  className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500"
                  onClick={() => handleEditRecipe(recipe._id)} // Pass recipe ID to handleEditRecipe
                >
                  {" "}
                  <span className="material-symbols-outlined">edit</span>
                </div>
                <div
                  className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500"
                  onClick={() => handleDeleteRecipe(recipe._id)} // Pass recipe ID to delete handler
                >
                  <span className="material-symbols-outlined">delete</span>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default ChefViewRecipes;
