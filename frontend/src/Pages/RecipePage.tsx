import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

const RecipePage = () => {
  const { recipeId } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null); // State to store the recipe data
  const [chef, setChef] = useState(""); // State to store the chef's name
  const [ingredients, setIngredients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await axios.get(
          `http://localhost:3001/api/recipes/getRecipeParam/${recipeId}`
        );
        const recipeData = recipeResponse.data;
        setRecipe(recipeData);

        // Fetch the chef details based on chefUID
        if (recipeData.chefUID) {
          const chefResponse = await axios.get(
            `http://localhost:3001/api/users/getChefByUID/${recipeData.chefUID}`
          );
          const chefData = chefResponse.data;
          setChef(`${chefData.firstName} ${chefData.lastName}`);
        }

        if (
          recipeData.selectedIngredients &&
          recipeData.selectedIngredients.length > 0
        ) {
          const ingredientsPromises = recipeData.selectedIngredients.map(
            async (ingredientId) => {
              const ingredientResponse = await axios.get(
                `http://localhost:3001/api/recipes/getSelectedIngredients/${ingredientId}`
              );
              return ingredientResponse.data.name; // Adjust based on your ingredient API response
            }
          );
          const ingredientNames = await Promise.all(ingredientsPromises);
          setIngredients(ingredientNames);
        }
      } catch (error) {
        console.error("Error fetching recipe or chef data:", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const navigateHome = () => {
    navigate("/home");
  };

  const navigateAllRecipes = () => {
    navigate("/allrecipes");
  };

  if (!recipe) return <p>Loading...</p>;

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
        <div className="flex flex-col items-end mt-12 min-w-96">
          <img
            src={recipe.recipeImageUrl}
            alt="Recipe Image"
            className="rounded-3xl w-30 h-30 object-cover"
            style={{ width: "350px", height: "350px" }}
          />
          <p className="text-3xl mt-7 font-medium">{recipe.title}</p>
          <p className="text-sm relative bottom-1 mb-4 text-stone-500">
            {chef}
          </p>
          <p className="flex text-orange-700 text-lg">
            SERVES : {recipe.servingCount}
          </p>
        </div>
        <div className="flex flex-col">
          <Separator orientation="vertical" className="bg-black opacity-50" />
        </div>

        <div className="flex flex-col items-center">
          <p className="flex mt-10 ">{`${recipe.type} | ${recipe.variety} | ${recipe.dietTypes}`}</p>
          <p className="text-orange-700 text-sm my-2">{recipe.description}</p>
          <div className="flex gap-10 mt-10 mb-5">
            <div className="flex flex-col items-end">
              <p className="flex text-xs">PREP TIME</p>
              <p className="flex text-4xl">{recipe.prepTime}</p>
            </div>
            <div>
              <Separator
                orientation="vertical"
                className="bg-black opacity-50"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="flex text-xs">COOK TIME</p>
              <p className="flex text-4xl">{recipe.cookTime}</p>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mt-10">
            <p className="text-teal-600 text-sm my-2">
              ORDER THESE INGREDIENTS DIRECTLY
            </p>
            <div className="flex flex-col gap-2 my-10">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-4">
                  <span className="material-symbols-outlined">add_circle</span>
                  <p className="uppercase">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <p className="text-teal-600">ADDITIONAL INGREDIENTS: </p>
            <p>{recipe.additionalIngredients.join(" | ")}</p>
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
            {recipe.instructions.map((instruction, index) => (
              <p key={index}>
                {index + 1}. {instruction}
              </p>
            ))}
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
