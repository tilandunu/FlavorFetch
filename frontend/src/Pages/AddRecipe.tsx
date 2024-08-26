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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
("use client");
import { Check, ChevronsUpDown } from "lucide-react";
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

const AddRecipe = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [frameworks, setFrameworks] = useState([]);

  useEffect(() => {
    // Fetch data from the ingredients collection
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/recipes/ingredients"
        ); // Update with your actual API endpoint
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ingredients = response.data.map((ingredient) => ({
          value: ingredient._id, // Assuming '_id' is the ObjectId
          label: ingredient.name,
        }));
        setFrameworks(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div
      className="bg-zinc-200 min-h-screen py-10"
      style={{
        backgroundImage: `url("/add-recipe-back.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="font-poppins px-32 py-16 mx-36 text-sm rounded-xl bg-zinc-100 shadow-xl">
        <div className="flex justify-between items-center pt-5 pb-14">
          <p className="text-4xl font-normal tracking-wide">ADD RECIPE</p>
          <div className="flex items-center gap-5">
            <span className="material-symbols-outlined">home</span>
            <p>LOGOUT</p>
          </div>
        </div>
        <Separator className="bg-black"></Separator>
        <form>
          {" "}
          <div className="pt-16 pb-3">
            <div className="py-3 flex gap-5">
              <p>ADD A IMAGE</p>{" "}
              <p className="text-stone-400">[ IMAGE SHOULD BE 1920x1080 ]</p>
            </div>

            <Input type="file"></Input>
          </div>
          <div className="py-3">
            <p className="py-3">Title</p>
            <Input className="h-12" />
          </div>
          <div className="py-3">
            <p className="py-3">Description</p>
            <Input className="h-12" />
          </div>
          <div className="flex justify-center gap-5 py-10">
            <div className="flex flex-col items-center bg-white px-7 py-10 rounded-2xl shadow-lg">
              <p className="pb-5">PREP TIME</p>
              <Separator className="mb-3"></Separator>
              <div className="flex gap-10">
                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">HOUR</p>
                  <Select required>
                    <SelectTrigger className="w-[180px] shadow-md">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="6+">More than six</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">MIN</p>
                  <Select>
                    <SelectTrigger className="w-[180px] shadow-md">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="45">45</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select required>
                    <SelectTrigger className="w-[180px] shadow-md">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="6+">More than six</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-center">
                  <p className="py-4 text-stone-500">MIN</p>

                  <Select>
                    <SelectTrigger className="w-[180px] shadow-md">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="45">45</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3">
            <p className="py-3">Servings</p>
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="6+">More than six</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-3">
            <p className="py-3">Add your ingredients</p>
            <div className="flex gap-5 items-center align-middle">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[600px] h-12 justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
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
                            framework.label
                              .toLowerCase()
                              .startsWith(value.toLowerCase())
                          )
                          .map((framework) => (
                            <CommandItem
                              key={framework.value}
                              onSelect={() => {
                                setValue(framework.value); // Keep ObjectId as the value
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
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
              <Button className="bg-green-700"> ADD </Button>
            </div>
          </div>
          <div className="py-3">
            <p className="py-3">Not in stock? Add them here</p>
            <div className="flex flex-row items-center align-middle gap-5">
              <Input className="w-[600px] h-12" />
              <Button className="bg-green-700"> ADD </Button>
            </div>
          </div>
          <div className="py-3">
            <p className="py-3">Instructions</p>
            <Textarea className="h-72" />
          </div>
          <div className="py-3">
            <p className="py-3">Variety</p>
            <Select required>
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
            <Select required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="Paleo">Paleo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-9">
            <p className="py-3">Special notes regarding allergies</p>
            <div className="flex  gap-4 py-2">
              <Checkbox />
              <p>Dairy-Free</p>
            </div>
            <div className="flex gap-4 py-2">
              <Checkbox />
              <p>Nut-Free</p>
            </div>
            <div className="flex gap-4 py-2">
              <Checkbox />
              <p>Soy-Free</p>
            </div>
            <div className="flex gap-4 py-2">
              <Checkbox />
              <p>Sugar-Free</p>
            </div>
          </div>
          <div className="flex justify-center">
            {" "}
            <Button className="flex w-1/3 h-12">ADD YOUR RECIPE</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
