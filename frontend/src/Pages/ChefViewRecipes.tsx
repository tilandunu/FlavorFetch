import React from "react";
import { useNavigate } from "react-router-dom";

const ChefViewRecipes = () => {
  const navigate = useNavigate();

  const navigateChefDashboard = () => {
    navigate("/chefDashboard");
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
        <section className="flex items-center gap-6 mt-6 py-8 mx-20 px-24 rounded-3xl hover:shadow-xl duration-300 justify-between bg-white">
          <div className="flex gap-10">
            {" "}
            <img
              src="../chefDashboard.jpeg"
              alt="Recipe Image"
              className="rounded-full w-30 h-30 object-cover p-0.5 border-2 hover:border-red-600 duration-1000"
              style={{ width: "120px", height: "120px" }}
            />
            <div className="flex flex-col justify-center ml-10">
              <p className="text-lg font-semibold">Cheese Omelette</p>
              <p
                className="max-w-[500px] overflow-hidden text-stone-600 font-light text-sm"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3 /* Number of lines to show */,
                  textOverflow: "ellipsis",
                }}
              >
                asd asiodjuaiosd a sdoijas doias jdoais jdsaod ijsaoi oas
                sjdiosaj aso idjas oia djasoid oais djioas oais jdoa aois
                jdasdasd asd sd asds as dsa sad sd jas duinj assoidj asoi djao
                idjaosi djoasj diosad o djhoias jdoais jda soidjas doisajd
              </p>
            </div>
          </div>

          <div className="flex gap-10">
            {" "}
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500">
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
        </section>

        <section className="flex items-center gap-6 mt-6 py-8 mx-20 px-24 rounded-3xl hover:shadow-xl duration-300 justify-between bg-white">
          <div className="flex gap-10">
            {" "}
            <img
              src="../chefDashboard.jpeg"
              alt="Recipe Image"
              className="rounded-full w-30 h-30 object-cover p-0.5 border-2 hover:border-red-600 duration-1000"
              style={{ width: "120px", height: "120px" }}
            />
            <div className="flex flex-col justify-center ml-10">
              <p className="text-lg font-semibold">Cheese Omelette</p>
              <p
                className="max-w-[500px] overflow-hidden text-stone-600 font-light text-sm"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3 /* Number of lines to show */,
                  textOverflow: "ellipsis",
                }}
              >
                asd asiodjuaiosd a sdoijas doias jdoais jdsaod ijsaoi oas
                sjdiosaj aso idjas oia djasoid oais djioas oais jdoa aois
                jdasdasd asd sd asds as dsa sad sd jas duinj assoidj asoi djao
                idjaosi djoasj diosad o djhoias jdoais jda soidjas doisajd
              </p>
            </div>
          </div>

          <div className="flex gap-10">
            {" "}
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500">
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
        </section>

        <section className="flex items-center gap-6 mt-6 py-8 mx-20 px-24 rounded-3xl hover:shadow-xl duration-300 justify-between bg-white">
          <div className="flex gap-10">
            {" "}
            <img
              src="../chefDashboard.jpeg"
              alt="Recipe Image"
              className="rounded-full w-30 h-30 object-cover p-0.5 border-2 hover:border-red-600 duration-1000"
              style={{ width: "120px", height: "120px" }}
            />
            <div className="flex flex-col justify-center ml-10">
              <p className="text-lg font-semibold">Cheese Omelette</p>
              <p
                className="max-w-[500px] overflow-hidden text-stone-600 font-light text-sm"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3 /* Number of lines to show */,
                  textOverflow: "ellipsis",
                }}
              >
                asd asiodjuaiosd a sdoijas doias jdoais jdsaod ijsaoi oas
                sjdiosaj aso idjas oia djasoid oais djioas oais jdoa aois
                jdasdasd asd sd asds as dsa sad sd jas duinj assoidj asoi djao
                idjaosi djoasj diosad o djhoias jdoais jda soidjas doisajd
              </p>
            </div>
          </div>

          <div className="flex gap-10">
            {" "}
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="flex bg-white p-4 rounded-full items-center shadow-md cursor-pointer hover:bg-black hover:text-white duration-500">
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChefViewRecipes;
