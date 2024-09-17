import React from "react";

const ChefViewRecipes = () => {
  return (
    <div className="font-poppins bg-stone-100 min-h-screen">
      <div className="flex justify-between items-center px-32 p-10">
        <div className="flex items-center gap-16">
          <img src="../trans black.png" alt="" className="w-20" />
          <p className="text-3xl font-normal">YOUR RECIPES</p>
        </div>

        <div className="flex gap-5 items-center">
          <span className="material-symbols-outlined">home</span>
          <p className="flex mr-8 border-b-2 hover:border-black duration-500 cursor-pointer">
            LOGOUT
          </p>
        </div>
      </div>

      <div>
        <section className="flex items-center gap-6 mt-6 py-8 mx-10 rounded-2xl shadow-md justify-around bg-white">
          <div className="flex gap-10">
            {" "}
            <img
              src="../chefDashboard.jpeg"
              alt="Recipe Image"
              className="rounded-full w-30 h-30 object-cover"
              style={{ width: "120px", height: "120px" }}
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Cheese Omelette</p>
              <p className="flex max-w-10">
                asdiasuduiahduiahncuiahuicahuichauichaiuchaiuchuiahcuihqiuwdhhuihcuyhcdu8hduqwhcduyashdcyu7gyudbycbyucguyqg
              </p>
            </div>
          </div>

          <div className="flex">
            {" "}
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer">
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChefViewRecipes;
