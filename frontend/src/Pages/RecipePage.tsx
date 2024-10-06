import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jsPDF } from "jspdf";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [chef, setChef] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await axios.get(
          `http://localhost:3001/api/recipes/getRecipeParam/${recipeId}`
        );
        const recipeData = recipeResponse.data;
        setRecipe(recipeData);

        const customerUID = Cookies.get("userID");
        if (customerUID) {
          const favoriteResponse = await axios.get(
            `http://localhost:3001/api/favorites/checkFavorite/${customerUID}/${recipeId}`
          );
          setIsFavorite(favoriteResponse.data.isFavorite);
        }

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

  const handleBackClick = () => {
    confirmNavigation("/allrecipes");
  };

  const confirmNavigation = (destination) => {
    if (cartItems.length > 0) {
      const userConfirmed = window.confirm(
        "You will lose your current cart details. Are you sure you want to leave this page?"
      );
      if (userConfirmed) {
        navigate(destination);
      }
    } else {
      navigate(destination); // No cart items, navigate directly
    }
  };

  const handleHomeClick = () => {
    confirmNavigation("/home");
  };

  const handleViewRatings = () => {
    navigate(`/ratings/${recipeId}`);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Set a modern font and a clean title layout
    doc.setFont("Helvetica ", "bold");
    doc.setTextColor(40, 44, 52); // Dark modern text color
    doc.setFontSize(24);
    doc.text(recipe.title, 20, 20);

    // Add chef name with a stylish format
    doc.setFontSize(14);
    doc.setFont("Helvetica ", "italic");
    doc.text(`Chef: ${chef}`, 20, 35);

    // Add a horizontal line to separate sections
    doc.setDrawColor(180, 180, 180); // Light gray for the line
    doc.line(20, 40, 190, 40);

    // Add recipe description in a smaller, lighter font
    doc.setFont("Helvetica ", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); // Lighter text for description
    doc.text(recipe.description, 20, 50, { maxWidth: 170 });

    // Add serving count with a larger, bold font

    doc.setFont("Helvetica ", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Green color for emphasis
    doc.text(`Serves: ${recipe.servingCount}`, 20, 65);

    // Add main ingredients section
    doc.setFont("Helvetica ", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Back to modern dark text
    doc.text("Ingredients:", 20, 80);

    // Use a bullet list format for the ingredients
    doc.setFont("Helvetica ", "normal");
    doc.setFontSize(12);
    ingredients.forEach((ingredient, index) => {
      doc.text(`• ${ingredient.name}`, 25, 90 + index * 10);
    });

    // Add additional ingredients section if applicable
    if (recipe.additionalIngredients.length > 0) {
      const additionalStartY = 90 + ingredients.length * 10 + 10;
      doc.setFont("Helvetica ", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0); // Light blue for additional ingredients
      doc.text("Additional Ingredients:", 20, additionalStartY);

      doc.setFont("Helvetica ", "normal");
      doc.setFontSize(12);
      recipe.additionalIngredients.forEach((ingredient, index) => {
        doc.text(`• ${ingredient}`, 25, additionalStartY + 10 + index * 10);
      });
    }

    // Add a page break and instructions
    doc.addPage();
    doc.setFont("Helvetica ", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Instructions:", 20, 20);

    // Use a clean and spaced-out layout for instructions
    doc.setFont("Helvetica ", "normal");
    doc.setFontSize(12);
    recipe.instructions.forEach((instruction, index) => {
      doc.text(`${index + 1}. ${instruction}`, 20, 30 + index * 10, {
        maxWidth: 170,
      });
    });

    // Add a footer with page number and branding
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Page ${i} of ${pageCount}`, 180, 290);
      doc.text("FlavorFetch Recipe", 20, 290); // Branding or any other info
    }

    // Save the PDF
    doc.save(`${recipe.title}.pdf`);
  };

  const toggleFavorite = async () => {
    const customerUID = Cookies.get("userID");
    if (!customerUID) {
      toast.error("You must be logged in to add favorites", {
        position: "top-right",
      });
      return;
    }

    try {
      if (isFavorite) {
        // Remove favorite
        await axios.delete(
          `http://localhost:3001/api/favorites/removeFavorite/${customerUID}/${recipeId}`
        );
        toast.success("Recipe removed from favorites", {
          position: "top-right",
        });
      } else {
        // Add favorite
        await axios.post(`http://localhost:3001/api/favorites/addFavorite`, {
          customerUID,
          recipeID: recipeId,
        });
        toast.success("Recipe added to favorites", { position: "top-right" });
      }

      setIsFavorite(!isFavorite); // Toggle the favorite state
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Failed to update favorite", { position: "top-right" });
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="font-poppins cursor-default bg-stone-100">
      <div className="flex gap-7 mx-16 py-10 justify-between items-center">
        <div className="flex gap-7 hover:cursor-pointer items-center">
          <span className="material-symbols-outlined" onClick={handleHomeClick}>
            home
          </span>
          <span className="material-symbols-outlined" onClick={handleBackClick}>
            arrow_back
          </span>
          <p
            className="border-2  rounded-xl p-2 px-4  duration-500 hover:bg-black hover:text-white text-sm uppercase"
            onClick={handleViewRatings}
          >
            View Ratings
          </p>
        </div>
        <div className="flex gap-9 items-center">
          {" "}
          <span
            className="material-symbols-outlined z-50"
            onClick={toggleModal}
          >
            shopping_cart
          </span>
          <span
            className={`material-symbols-outlined z-50 ${
              isFavorite ? "text-red-500" : ""
            }`}
            onClick={toggleFavorite}
          >
            favorite
          </span>
        </div>
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
        <div className="flex flex-col items-center w-full my-4 justify-center ">
          <div
            className="flex flex-col border-2 border-black items-center p-10 hover:p-12 duration-500 hover:bg-black hover:text-stone-200"
            onClick={generatePDF}
          >
            {" "}
            <span className="material-symbols-outlined">arrow_downward</span>
            <p>DOWNLOAD RECIPE</p>
          </div>
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

  //the checkout part
  const handleCheckout = async () => {
    const customerUID = Cookies.get("userID"); // Assuming you have imported Cookies

    if (!customerUID) {
      toast.error("You must be logged in to checkout", {
        position: "top-right",
      });
      return;
    }

    const orderData = {
      customerUID: customerUID,
      ingredients: cartItems.map((item, index) => ({
        ingredient: item._id,
        quantity: quantities[index],
      })),
      totalAmount: cartItems.reduce(
        (total, item, index) => total + item.pricePerUnit * quantities[index],
        0
      ),
      paymentMethod: "Cash on Delivery", // Default payment method
      status: "To-Be-Delivered", // Default status
      deliveryAddress: "123 Main Street", // You can replace this with actual user input
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/order/create", // Adjust the API endpoint if necessary
        orderData
      );
      toast.success("Order placed successfully!", { position: "top-right" });
      onClose(); // Close the modal after successful checkout
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to place the order", { position: "top-right" });
    }
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
                  <th className="p-2 text-center">Ingredient</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id} className="border-b">
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
            <button
              className="w-full bg-red-500 text-white p-2 rounded-lg uppercase font-semibold"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
