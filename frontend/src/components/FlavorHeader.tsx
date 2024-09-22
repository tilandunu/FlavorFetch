import { useNavigate } from "react-router-dom";

const FlavorHeader = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  };

  const navigateRecipes = () => {
    navigate("/suppl");
  };

  const navigateProfile = () => {
    navigate("/customerUserProfile");
  };

  const navigateTicket = () => {
    navigate("/SupportTicketDashboard");
  };

  const navigateOrders = () => {
    navigate("/orderManagement");
  };

  return (
    <div>
      <div className="flex flex-row justify-center mx-16 font-poppins">
        <p
          className="bg-black text-stone-200 py-5 w-1/4 text-center hover:bg-red-600 hover:text-red-200 duration-500 cursor-pointer rounded-l-full"
          onClick={navigateHome}
        >
          HOME
        </p>
        <p
          className="bg-black text-stone-200 py-5 w-1/4 text-center hover:bg-red-600 hover:text-red-200 duration-500 cursor-pointer "
          onClick={navigateRecipes}
        >
          RECIPES
        </p>
        <p
          className="bg-black text-stone-200 py-5 w-1/4 text-center hover:bg-red-600 hover:text-red-200 duration-500 cursor-pointer"
          onClick={navigateProfile}
        >
          PROFILE
        </p>
        <p
          className="bg-black text-stone-200 py-5 w-1/4 text-center hover:bg-red-600 hover:text-red-200 duration-500 cursor-pointer"
          onClick={navigateOrders}
        >
          ORDERS
        </p>
        <p
          className="bg-black text-stone-200 py-5 w-1/4 text-center hover:bg-red-600 hover:text-red-200 duration-500 cursor-pointer rounded-r-full"
          onClick={navigateTicket}
        >
          RAISE A TICKET
        </p>
      </div>
    </div>
  );
};

export default FlavorHeader;
