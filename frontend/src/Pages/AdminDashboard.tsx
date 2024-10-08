import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const goTicket = () => {
    navigate("/ResponseDashboard");
  };

  const goStock = () => {
    navigate("/ingredientHome");
  };

  return (
    <div className="font-poppins cursor-default">
      <div className="flex flex-col bg-[#CCCCCC] h-screen p-10">
        <div className="flex flex-col justify-center items-center bg-white rounded-lg">
          <p className="text-3xl mt-24 mb-4">ADMIN DASHBOARD</p>
          <Button className="mb-20 w-40 bg-red-600 duration-500">LOGOUT</Button>
        </div>

        <div className="flex flex-row gap-14 justify-center items-center bg-[#EFEFEF] rounded-b-lg h-full">
          <div
            className="flex flex-col items-center shadow-md rounded-2xl hover:text-red-900 duration-500 cursor-pointer"
            onClick={goStock}
          >
            <div className="flex justify-center items-center p-14 bg-white rounded-2xl z-10 w-40 h-40 hover:bg-stone-600 hover:text-white duration-500">
              <span className="material-symbols-outlined text-5xl">
                inventory
              </span>
            </div>
            <div className="bg-[#F0F0F0] p-2 flex items-end h-12 relative bottom-3 z-0 w-40 justify-center rounded-b-xl ">
              <p className="text-xs font-semibold">STOCK MANAGEMENT</p>
            </div>
          </div>

          <div
            className="flex flex-col items-center shadow-md rounded-2xl hover:text-red-900 duration-500 cursor-pointer"
            onClick={goTicket}
          >
            <div className="flex justify-center items-center p-14 bg-white rounded-2xl z-10 w-40 h-40 hover:bg-stone-600 hover:text-white duration-500">
              <span className="material-symbols-outlined text-5xl">
                confirmation_number
              </span>
            </div>
            <div className="bg-[#F0F0F0] p-2 flex items-end h-12 relative bottom-3 z-0 w-40 justify-center rounded-b-xl">
              <p className="text-xs font-semibold">RESPOND TICKETS</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
