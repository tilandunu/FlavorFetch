import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Define the type for the route parameters
interface Params {
  id: string;
}

function UpdateIngredient() {
  const { id } = useParams<Params>();

  // State variables with appropriate types
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [lowStock, setLowStock] = useState<boolean>(false); // Use boolean type for lowStock
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/ingredients/getIngredient/${id}`)
      .then((result) => {
        setName(result.data.name);
        setCategory(result.data.category);
        setQuantity(result.data.quantity);
        setMinQuantity(result.data.minQuantity);
        setLowStock(result.data.lowStock);
        setPricePerUnit(result.data.pricePerUnit);
        setDate(result.data.date);
        // Image handling would depend on your backend
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateIngredient = (e: FormEvent) => {
    e.preventDefault();

    // Create form data to handle file uploads
    // Use JSON to update ingredient details
    const updatedIngredient = {
      name,
      category,
      quantity,
      minQuantity,
      pricePerUnit,
      date,
    };

    axios
      .put(
        `http://localhost:3001/api/ingredients/updateIngredient/${id}`,
        updatedIngredient,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((result) => {
        console.log(result);
        navigate("/ingredientHome");
      })
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex bg-stone-200 py-10 h-screen font-poppins">
      <div className="flex bg-white rounded-lg px-20 pt-16 pb-20 w-full mx-20 shadow-xl">
        <form onSubmit={updateIngredient} className="w-full">
          <div className="flex justify-between items-baseline">
            {" "}
            <p className="text-4xl uppercase pb-12 font-semibold pt-1">
              Update Ingredient
            </p>
            <span
              className="material-symbols-outlined hover:text-red-800 cursor-pointer duration-300"
              onClick={goBack}
            >
              arrow_back
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <div className="flex mb-3 justify-between gap-40 items-center">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Enter Ingredient Name"
                className="w-1/2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex mb-2 justify-between gap-40 items-center">
              <Label htmlFor="category">Category</Label>
              <Input
                type="text"
                placeholder="Enter Ingredient Category"
                className="w-1/2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex mb-2 justify-between gap-40 items-center">
              <Label htmlFor="quantity">Stock Quantity</Label>
              <Input
                type="number"
                placeholder="Enter Stock Quantity"
                className="w-1/2"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="flex mb-2 justify-between gap-40 items-center">
              <Label htmlFor="minQuantity">Minimum Quantity</Label>
              <Input
                type="number"
                placeholder="Enter Minimum Quantity"
                className="w-1/2"
                value={minQuantity}
                onChange={(e) => setMinQuantity(Number(e.target.value))}
              />
            </div>
            <div className="flex mb-2 justify-between gap-40 items-center">
              <Label htmlFor="pricePerUnit">Unit Price</Label>
              <Input
                type="number"
                placeholder="Enter Unit Price"
                className="w-1/2"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
              />
            </div>
            <div className="flex mb-2 justify-between gap-40 items-center">
              <Label htmlFor="date">Added Date</Label>
              <Input
                type="date"
                placeholder="Enter the date"
                className="w-1/2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            {" "}
            <Button className="my-10 w-40" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateIngredient;
