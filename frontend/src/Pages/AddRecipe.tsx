/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown } from "lucide-react"; // Added X for the remove button
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imagedb } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

//hooks
const AddRecipe = () => {
  const chefUID = Cookies.get("userID");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [frameworks, setFrameworks] = useState([]);
  type Ingredient = {
    ingredient: string; // ObjectId of the ingredient
    label: string; // Name of the ingredient
  };
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [additionalIngredients, setAdditionalIngredients] = useState<string[]>(
    []
  );
  const [newIngredient, setNewIngredient] = useState("");

  const [prepHours, setPrepHours] = useState("");
  const [cookHours, setCookHours] = useState("");
  const [prepMinutes, setPrepMinutes] = useState("");
  const [cookMinutes, setCookMinutes] = useState("");

  const [recipeImage, setRecipeImage] = useState("");
  const [recipeImageUrl, setRecipeImageUrl] = useState("[]");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [variety, setVariety] = useState("");
  const [dietTypes, setDietTypes] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [servingCount, setServingCount] = useState("");

  useEffect(() => {
    // Fetch data from the ingredients collection
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/recipes/ingredients"
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ingredients = response.data.map((ingredient) => ({
          value: ingredient._id, // Assuming '_id' is the ObjectId
          label: ingredient.name,
        }));
        console.log("Fetched ingredients:", ingredients);

        setFrameworks(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  //functions

  const handleAddIngredient = () => {
    console.log("Current value:", value);
    const selectedIngredient = frameworks.find(
      // @ts-ignore
      (framework) => framework.value === value
    );
    if (selectedIngredient) {
      if (
        selectedIngredients.some(
          // @ts-ignore
          (ing) => ing.ingredient === selectedIngredient.value
        )
      ) {
        toast.error("Ingredient already added!");
      } else {
        setSelectedIngredients((prev) => [
          ...prev,
          {
            // @ts-ignore
            ingredient: selectedIngredient.value,
            // @ts-ignore
            label: selectedIngredient.label,
          },
        ]);
        setValue(""); // Clear the selection
        setOpen(false);
      }
    }
  };

  const handleClearIngredient = () => {
    setValue(""); // Clear the selected value
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((ingredient) => ingredient.ingredient !== ingredientToRemove)
    );
  };

  const handleAddAdditionalIngredient = () => {
    if (!newIngredient.trim()) {
      toast.error("Please enter an ingredient!");
      return;
    }

    // Validate ingredient using the regular expression
    if (!validText.test(newIngredient)) {
      toast.error("Ingredient contains invalid characters.");
      return;
    }

    // If valid, add the ingredient
    setAdditionalIngredients((prev) => [...prev, newIngredient.trim()]);
    setNewIngredient(""); // Clear the input field after adding
  };

  const handleRemoveAdditionalIngredient = (ingredientToRemove: string) => {
    setAdditionalIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAddAdditionalIngredient(); // Handle adding ingredient
    }
  };

  const handleCheckboxChange = (allergy: string) => {
    setSelectedAllergies(
      (prev) =>
        prev.includes(allergy)
          ? prev.filter((item) => item !== allergy) // Remove allergy if it's already in the array
          : [...prev, allergy] // Add allergy to the array
    );
  };

  const handleUpload = async () => {
    if (!recipeImage) {
      toast.error("Please select an image to upload");
      return;
    }

    const imageRef = ref(imagedb, `recipes/${v4()}`);
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const snapshot = await uploadBytes(imageRef, recipeImage);
      const url = await getDownloadURL(snapshot.ref);
      setRecipeImageUrl(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddInstruction = () => {
    if (!currentInstruction.trim()) {
      toast.error("Please enter an instruction!");
      return;
    }

    // Validate instruction using the regular expression
    if (!validText.test(currentInstruction)) {
      toast.error("Instruction contains invalid characters.");
      return;
    }

    // If valid, add the instruction
    setInstructions((prev) => [...prev, currentInstruction.trim()]);
    setCurrentInstruction(""); // Clear the input field after adding
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Regular expression to allow only letters, numbers, and spaces
    const validText = /^[a-zA-Z ]*$/;

    // Validate title and description
    if (!validText.test(title)) {
      toast.error("Title contains invalid characters.");
      return;
    }

    if (!validText.test(description)) {
      toast.error("Description contains invalid characters.");
      return;
    }

    if (
      !type ||
      !variety ||
      !recipeImage ||
      !dietTypes ||
      !selectedIngredients.length ||
      !instructions.length
    ) {
      if (!type) {
        toast.error("Please select a recipe type.");
      }
      if (!variety) {
        toast.error("Please select a variety.");
      }
      if (!recipeImage) {
        toast.error("Please upload a recipe image.");
      }
      if (!dietTypes || dietTypes.length === 0) {
        toast.error("Please select at least one diet type.");
      }
      if (!selectedIngredients.length) {
        toast.error("Please add at least one ingredient.");
      }
      if (!instructions.length) {
        toast.error("Please provide instructions for the recipe.");
      }
      return;
    }

    console.log("Ingredients to submit:", selectedIngredients);
    const ingredientsToSubmit = selectedIngredients.map(
      (ing) => ing.ingredient
    );

    const prepTime = `${prepHours} ${prepMinutes}`;
    const cookTime = `${cookHours} ${cookMinutes}`;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/recipes/createRecipe",
        {
          chefUID,
          title,
          description,
          type,
          variety,
          dietTypes,
          selectedAllergies,
          prepTime,
          cookTime,
          servingCount,
          selectedIngredients: ingredientsToSubmit,
          additionalIngredients,
          instructions,
          recipeImageUrl,
        }
      );

      console.log(response.data);
      toast.success("Recipe added successfully!");
      // Redirect to chef dashboard after successful submission
      window.location.href = "/chefDashboard";
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast.error("Failed to add recipe. Please try again.");
    }
  };

  const navigate = useNavigate();
  const validText = /^[a-zA-Z0-9 ]*$/;

  const navigateChefDashboard = () => {
    navigate("/chefDashboard");
  };

  return (
    <div
      className="bg-zinc-200 min-h-screen py-10"
      style={{
        backgroundImage: `url("/add-recipe-back.jpg")`,
        backgroundSize: "30%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adding a semi-transparent overlay color
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="font-poppins px-32 py-16 mx-36 text-sm rounded-xl bg-zinc-100 shadow-xl">
        <div className="flex justify-between items-center pt-5 pb-14">
          <p className="text-4xl font-normal tracking-wide">ADD RECIPE</p>
          <div className="flex items-center gap-5">
            <span
              className="material-symbols-outlined hover:cursor-pointer"
              onClick={navigateChefDashboard}
            >
              home
            </span>
            <p>LOGOUT</p>
          </div>
        </div>
        <Separator className="bg-black"></Separator>
        <form onSubmit={handleSubmit}>
          <div className="pt-16 pb-3">
            <div className="py-3 flex gap-5">
              <p>ADD A IMAGE</p>
            </div>
            <div className="flex gap-10">
              <Input
                type="file"
                // @ts-ignore
                onChange={(e) => setRecipeImage(e.target.files[0])}
              ></Input>
              <Button type="button" onClick={handleUpload}>
                Upload
              </Button>
            </div>

            {recipeImageUrl && (
              <div className="my-10">
                <p>Uploaded Image:</p>
                <img
                  src={recipeImageUrl}
                  alt="Uploaded recipe"
                  className="mt-6 max-w-xs"
                />
              </div>
            )}
          </div>
          <div className="py-3">
            <p className="py-3">Type</p>
            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Appetizers & Snacks">
                  Appetizers & Snacks
                </SelectItem>
                <SelectItem value="Main Courses">Main Courses</SelectItem>
                <SelectItem value="Desserts">Desserts</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Salads">Salads</SelectItem>
                <SelectItem value="Soups & Stews">Soups & Stews</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-3">
            <p className="py-3">Title</p>
            <Input
              className="h-12"
              value={title}
              placeholder="Add your title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="py-3">
            <p className="py-3">Description</p>
            <Input
              className="h-12"
              placeholder="Add your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center gap-5 py-10">
            <div className="flex flex-col items-center bg-white px-7 py-10 rounded-2xl shadow-lg">
              <p className="pb-5">PREP TIME</p>
              <Separator className="mb-3"></Separator>
              <div className="flex gap-10">
                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">HOUR</p>
                  <Input
                    type="number"
                    value={prepHours}
                    onChange={(e) => setPrepHours(e.target.value)}
                    min="0"
                    max="24"
                    className="w-[180px] shadow-md"
                    placeholder="Enter hours"
                    required
                  />
                  <p className="mt-3 text-xs text-stone-500">Max: 24 hours</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">MIN</p>
                  <Input
                    type="number"
                    value={prepMinutes}
                    onChange={(e) => setPrepMinutes(e.target.value)}
                    min="0"
                    max="59"
                    className="w-[180px] shadow-md"
                    placeholder="Enter minutes"
                    required
                  />
                  <p className="mt-3 text-xs text-stone-500">Max: 59 minutes</p>
                </div>
              </div>
            </div>
            <div>
              <Separator orientation="vertical"></Separator>
            </div>
            <div className="flex flex-col items-center bg-white px-7 py-10 rounded-2xl shadow-lg">
              <p className="pb-5">COOKING TIME</p>
              <Separator className="mb-3"></Separator>
              <div className="flex gap-10">
                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">HOUR</p>
                  <Input
                    type="number"
                    value={cookHours}
                    onChange={(e) => setCookHours(e.target.value)}
                    min="0"
                    max="24"
                    className="w-[180px] shadow-md"
                    placeholder="Enter hours"
                    required
                  />
                  <p className="mt-3 text-xs text-stone-500">Max: 6 hours</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">MIN</p>
                  <Input
                    type="number"
                    value={cookMinutes}
                    onChange={(e) => setCookMinutes(e.target.value)}
                    min="0"
                    max="59"
                    className="w-[180px] shadow-md"
                    placeholder="Enter minutes"
                    required
                  />
                  <p className="mt-3 text-xs text-stone-500">Max: 59 minutes</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3">
            <p className="py-3">Servings</p>
            <Input
              type="number"
              className="h-12 w-full border px-3"
              placeholder="Input a number"
              value={servingCount}
              onChange={(e) => setServingCount(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="py-3">
            <p className="py-3">Ingredients</p>
            <div className="flex gap-5">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[600px] h-12 justify-between"
                  >
                    {value
                      ? frameworks.find(
                          // @ts-ignore
                          (framework) => framework.value === value
                          // @ts-ignore
                        )?.label
                      : "Select Ingredient..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[600px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Ingredient..." />
                    <CommandList>
                      <CommandEmpty>No ingredient found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks
                          .filter((framework) =>
                            // @ts-ignore
                            framework.label
                              .toLowerCase()
                              .includes(value.toLowerCase())
                          )
                          .map((framework) => (
                            <CommandItem
                              // @ts-ignore
                              key={framework.value}
                              onSelect={() => {
                                // @ts-ignore
                                setValue(framework.value);
                                // Keep ObjectId as the value
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  // @ts-ignore
                                  value === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label} {/* Display the label */}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddIngredient();
                }}
                className="bg-green-700"
              >
                ADD
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleClearIngredient();
                }}
                className="bg-green-700"
              >
                CLEAR
              </Button>
            </div>
          </div>
          <div className="py-3">
            <p className="py-3">Selected Ingredients</p>
            <ul>
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((item, index) => (
                  <li
                    key={index}
                    className="py-3 my-5 px-6 w-1/2 bg-stone-100 text-stone-800 rounded-full border-2 border-black flex justify-between items-center"
                  >
                    {item.label}
                    <p
                      className="font-inter hover:cursor-pointer"
                      onClick={() => handleRemoveIngredient(item.ingredient)}
                    >
                      X
                    </p>
                  </li>
                ))
              ) : (
                <li className="px-10 py-2 text-stone-600 text-xm">
                  No ingredients selected.
                </li>
              )}
            </ul>
          </div>
          <div className="py-3">
            <p className="py-3">Not in stock? Add them here</p>
            <div className="flex flex-row items-center align-middle gap-5">
              <Input
                className="w-[600px] h-12"
                value={newIngredient}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewIngredient(value); // Allow input without blocking
                }}
                placeholder="Add your additional ingredients"
                onKeyDown={handleKeyDown}
              />

              <Button
                className="bg-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddAdditionalIngredient();
                }}
                type="button"
              >
                ADD
              </Button>
            </div>
          </div>
          <div className="py-3">
            <p className="py-3">Additional Ingredients</p>
            <ul>
              {additionalIngredients.length > 0 ? (
                additionalIngredients.map((item, index) => (
                  <li
                    key={index}
                    className="py-3 my-5 px-6 w-1/2 bg-stone-100 text-stone-800 rounded-full border-2 border-black flex justify-between items-center"
                  >
                    {item}
                    <p
                      className="font-inter hover:cursor-pointer"
                      onClick={() => handleRemoveAdditionalIngredient(item)}
                    >
                      X
                    </p>
                  </li>
                ))
              ) : (
                <li className="px-10 py-2 text-stone-600 text-xm">
                  No additional ingredients added.
                </li>
              )}
            </ul>
          </div>
          <div className="py-3">
            <p className="py-3">Instructions</p>
            <div className="flex flex-row items-center align-middle gap-5">
              <Input
                className="w-[600px] h-12"
                value={currentInstruction}
                onChange={(e) => setCurrentInstruction(e.target.value)}
                placeholder="Enter an instruction step..."
              />
              <Button
                className="bg-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddInstruction();
                }}
                type="button"
              >
                ADD STEP
              </Button>
            </div>
            <ul className="mt-4">
              {instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="py-3 my-5 px-6 bg-stone-100 text-stone-800 rounded-lg border-2 border-black flex justify-between items-center"
                >
                  <span>{`${index + 1}. ${instruction}`}</span>
                  <Button
                    type="button"
                    onClick={() => handleRemoveInstruction(index)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-3">
            <p className="py-3">Variety</p>
            <Select
              required
              value={variety}
              onValueChange={(value) => setVariety(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SriLankan">Sri Lankan</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Western">Western</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Mexican">Mexican</SelectItem>
                <SelectItem value="Indian">Indian</SelectItem>
                <SelectItem value="American">American</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-3">
            <p className="py-3">Diet Type</p>
            <Select
              required
              value={dietTypes}
              onValueChange={(value) => setDietTypes(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="Paleo">Paleo</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col py-9">
            <p className="py-3">Special notes regarding allergies</p>
            <div className="flex items-center justify-start gap-4 py-2">
              <Input
                type="checkbox"
                className="w-6"
                checked={selectedAllergies.includes("Dairy-Free")}
                onChange={() => handleCheckboxChange("Dairy-Free")}
              />
              <p>Dairy-Free</p>
            </div>
            <div className="flex items-center justify-start gap-4 py-2">
              <Input
                type="checkbox"
                className="w-6"
                checked={selectedAllergies.includes("Nut-Free")}
                onChange={() => handleCheckboxChange("Nut-Free")}
              />
              <p>Nut-Free</p>
            </div>
            <div className="flex items-center justify-start gap-4 py-2">
              <Input
                type="checkbox"
                className="w-6"
                checked={selectedAllergies.includes("Soy-Free")}
                onChange={() => handleCheckboxChange("Soy-Free")}
              />
              <p>Soy-Free</p>
            </div>
            <div className="flex items-center justify-start gap-4 py-2">
              <Input
                type="checkbox"
                className="w-6"
                checked={selectedAllergies.includes("Sugar-Free")}
                onChange={() => handleCheckboxChange("Sugar-Free")}
              />
              <p>Sugar-Free</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="flex w-1/3 h-12">
              ADD YOUR RECIPE
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;
