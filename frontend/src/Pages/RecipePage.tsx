import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [chef, setChef] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await axios.get(
          `http://localhost:3001/api/recipes/getRecipeParam/${recipeId}`
        );
        const recipeData = recipeResponse.data;
        setRecipe(recipeData);

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
          // Populate ingredient names directly
          const ingredientsResponse = await axios.get(
            `http://localhost:3001/api/recipes/populateIngredients`,
            { params: { ingredientIds: recipeData.selectedIngredients } }
          );
          setIngredients(ingredientsResponse.data); // Assuming this returns an array of ingredient names
        }
      } catch (error) {
        console.error("Error fetching recipe or chef data:", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const addToCart = (ingredient) => {
    const existingItem = cartItems.find((item) => item._id === ingredient._id);

    if (existingItem) {
      toast.error("Item is already in the cart", { position: "top-right" });
    } else {
      setCartItems((prev) => [...prev, ingredient]);
      toast.success("Item added successfully", { position: "top-right" });
    }
  };

  const removeFromCart = (ingredient) => {
    setCartItems(cartItems.filter((item) => item._id !== ingredient._id));
    toast.success("Item removed from the cart", { position: "top-right" });
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const navigateAllRecipes = () => {
    navigate("/allrecipes");
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="font-poppins cursor-default bg-stone-100">
      <div className="flex gap-7 mx-16 py-10 justify-between">
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
        <span className="material-symbols-outlined z-50" onClick={toggleModal}>
          shopping_cart
        </span>
      </div>
      <div className="flex justify-center gap-32">
        <div className="flex flex-col items-end mt-12 min-w-96">
          <img
            src={recipe.recipeImageUrl}
            alt="Recipe Image"
            className="rounded-3xl object-cover transition-all duration-1000 w-[350px] h-[350px] hover:w-[380px] hover:h-[380px] hover:-rotate-3 hover:shadow-md"
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
            <p className="font-semibold text-sm my-2">
              ORDER THESE INGREDIENTS DIRECTLY
            </p>
            <div className="flex flex-col gap-2 mt-3 mb-16">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex gap-4 hover:text-green-600 duration-500 cursor-pointer font-light items-center"
                >
                  <Button onClick={() => addToCart(ingredient)}>Add+</Button>
                  <p className="uppercase text-sm">{ingredient.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-5 w-full items-center">
            <p className="font-semibold text-sm">ADDITIONAL INGREDIENTS: </p>
            <p className="uppercase text-sm">
              {recipe.additionalIngredients.join(" | ")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex mx-10 mt-32 mb-20">
        <Separator className="bg-black" />
      </div>
      <div className="flex justify-between ml-40 mt-28 pb-32">
        <div className="w-full border-2 border-black p-10">
          <p className="flex font-light text-3xl mb-6">INSTRUCTIONS</p>
          <div className="flex flex-col text-sm gap-3 font-normal hover:text-lg duration-1000">
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

      {/* Render modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

const Modal = ({ isOpen, onClose, cartItems, removeFromCart }) => {
  if (!isOpen) return null;

  // You can add state to track quantities if needed
  const [quantities, setQuantities] = useState(cartItems.map(() => 1));

  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = Math.max(1, newQuantities[index] + delta);
      return newQuantities;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center font-poppins">
      <div className="bg-white rounded-lg shadow-lg w-[90%] h-[80%]">
        <div className="flex justify-end items-center p-4 bg-gray-100 rounded-t-lg">
          <button
            className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex p-10">
          <div className="flex-grow">
            <table className="w-full ">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-center">Image</th>
                  <th className="p-2 text-center">Ingredient</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-2 text-center">
                      <div className="flex justify-center items-center">
                        <img
                          src={item.ingredientImage}
                          alt={item.name}
                          className="w-12 h-12 rounded"
                        />
                      </div>
                    </td>
                    <td className="p-2 text-center">{item.name}</td>
                    <td className="p-2 text-center">{item.pricePerUnit}</td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center items-center">
                        <button
                          className="w-8 h-8 bg-gray-300 text-black rounded-full"
                          onClick={() => handleQuantityChange(index, -1)}
                        >
                          -
                        </button>
                        <span className="mx-4">{quantities[index]}</span>
                        <button
                          className="w-8 h-8 bg-gray-300 text-black rounded-full"
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="w-8 h-8 bg-red-500 text-white rounded-full"
                        onClick={() => removeFromCart(item)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3 bg-gray-100 p-4 ml-6 rounded-lg px-10">
            <h3 className="text-lg font-semibold my-5">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <p className="text-sm  h-52">INGREDIENTS</p>
              <p className="text-sm">{cartItems.length}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="font-semibold">Total Cost</p>
              <p className="font-semibold">
                Rs.
                {cartItems
                  .reduce((total, item, index) => {
                    return total + item.pricePerUnit * quantities[index];
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
            <button className="w-full bg-red-500 text-white p-2 rounded-lg uppercase font-semibold">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
