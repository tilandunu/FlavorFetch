import { Separator } from "@/components/ui/separator";

const ChefDashboard = () => {
  return (
    <div className="p-5">
      <div className="flex font-poppins bg-slate-100">
        <div className="flex flex-col py-10 px-16  items-center gap-11">
          <img className="w-28 mt-10" src="/trans-black.svg" alt="" />
          <p className="mt-2">VIEW RECIPES</p>
          <p>PROFILE MANAGEMENT</p>
          <p className="mt-28 text-red-600">DELETE ACCOUNT</p>
        </div>
        <div className="flex flex-col">
          <Separator orientation="vertical" />
        </div>

        <div className="px-10 py-20">
          <div className="flex content-center align-middle items-center justify-between">
            <p className="text-4xl font-semibold text-amber-950 mx-2">
              CHEF DASHBOARD
            </p>
            <div className="flex content-center align-middle justify-center items-center gap-4">
              <p>8</p>
              <p>LOGOUT</p>
            </div>
          </div>
          <div className="flex gap-14">
            <div>
              <div className="flex flex-col py-20 gap-5">
                <div className="flex gap-24 py-5 px-7 w-[600px] bg-white rounded-2xl shadow-md">
                  <p>8</p>
                  <p>ADD RECIPE</p>
                </div>
                <div className="flex gap-24 py-5 px-7 w-[600px] bg-white rounded-2xl shadow-md">
                  <p>8</p>
                  <p>EDIT RECIPE</p>
                </div>
                <div className="flex gap-24 py-5 px-7 w-[600px] bg-white rounded-2xl shadow-md">
                  <p>8</p>
                  <p>DELETE RECIPE</p>
                </div>
              </div>
              <div className="flex flex-col p-6 bg-white rounded-2xl shadow-sm w-[600px]">
                <p className="text-xs text-stone-400">TIPS</p>
                <p className="text-sm">
                  Keep abreast of the latest trends and incorporate popular
                  ingredients or techniques into your recipes
                </p>
              </div>
            </div>
            <div className="p-14 flex flex-col items-center mt-5 rounded-3xl shadow-md  bg-white">
              <p className="text-2xl">YOUR TOP RATED RECIPES</p>
              <p className="text-xs">BASED ON RATINGS FROM THE USERS</p>
              <Separator className="mt-5 bg-black" />
              <div className="flex flex-col gap-10 py-20">
                <div className="flex justify-between w-64">
                  <p>BUTTER CHICKEN</p>
                  <div className="flex">
                    <p>#</p>
                    <p>4.58</p>
                  </div>
                </div>
                <div className="flex justify-between w-64">
                  <p>CUTTLEFISH CURRY</p>
                  <div className="flex">
                    <p>#</p>
                    <p>4.2</p>
                  </div>
                </div>
                <div className="flex justify-between w-64">
                  <p>POTATO CURRY</p>
                  <div className="flex">
                    <p>#</p>
                    <p>3.62</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
