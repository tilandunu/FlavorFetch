import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages and components from the new code
//import Header from "./components/Header";
//import Footer from "./components/Footer";
import Mange from "./Pages/Manage";
import Add from "./Pages/Addsup";
import EditeList from "./Pages/EditeList";

// Existing components and pages
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import ChefDashboard from "./Pages/ChefDashboard";
import SupplierDashboard from "./Pages/SupplierDashboard";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import { SignupDriver } from "./Pages/SignupDriver";
import AllRecipes from "./Pages/AllRecipes";
import CustomerUserProfile from "./Pages/CustomerUserProfile";
import TicketDashboard from "./Pages/TicketDashboard";
import AddRecipe from "./Pages/AddRecipe";
import { SignupSupplier } from "./Pages/SignupSupplier";
import ChefViewRecipes from "./Pages/ChefViewRecipes";
import { SupportTicket } from "./Pages/SupportTicket";
import { SupportTicketDashboard } from "./Pages/SupportTicketDashboard";
import { Feedback } from "./Pages/Feedback";
import { ViewSupportFeedback } from "./Pages/ViewSupportFeedback";
import { TicketUserAccount } from "./Pages/TicketUserAccount";
import { ViewMyTickets } from "./Pages/ViewMyTickets";
import { EditSupportTicket } from "./Pages/EditSupportTicket";
import { EditSupportFeedback } from "./Pages/EditSupportFeedback";

import DriverDashboard from "./Pages/Driver/Dashboard";
import Role from "./Pages/Driver/DeleveryHistory";
import UserManagement from "./Pages/Driver/UserManagement";
import Ingredients from "./Pages/Ingredients";
import CreateIngredient from "./Pages/CreateIngredient";
import UpdateIngredient from "./Pages/UpdateIngredient";
import RequestIngredient from "./Pages/Thila";
import StockNotification from "./Pages/StockNotification";

import UpOrder from "./components/UpdateOrder/UpOrder";
import OrderManagement from "./Pages/OrderManagement";
import OrderManagementNC from "./Pages/OrderManagementNC";

function App() {
  return (
    <Router>
      
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Routes from previous code */}
              <Route path="/" element={<Signup />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/chefDashboard" element={<ChefDashboard />} />
              <Route path="/supplierDashboard" element={<SupplierDashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/signupDriver" element={<SignupDriver />} />
              <Route path="/SupportTicket" element={<SupportTicket />} />
              <Route path="/SupportTicketDashboard" element={<SupportTicketDashboard />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/ViewSupportFeedback" element={<ViewSupportFeedback />} />
              <Route path="/TicketUserAccount" element={<TicketUserAccount />} />
              <Route path="/ViewMyTickets" element={<ViewMyTickets />} />
              <Route path="/signupSupplier" element={<SignupSupplier />} />
              <Route path="/allrecipes" element={<AllRecipes />} />
              <Route path="/customerUserProfile" element={<CustomerUserProfile />} />
              <Route path="/ticketDashboard" element={<TicketDashboard />} />
              <Route path="/driverdashboard" element={<DriverDashboard />} />
              <Route path="/role-management" element={<Role />} />
              <Route path="/orderdetails/:id" element={<UpOrder />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/ingredientHome" element={<Ingredients />} />
              <Route path="/create" element={<CreateIngredient />} />
              <Route path="/update/:id" element={<UpdateIngredient />} />
              <Route path="/requestIng" element={<RequestIngredient />} />
              <Route path="/stocknt" element={<StockNotification />} />
              <Route path="/addRecipe" element={<AddRecipe />} />
              <Route path="/chefViewRecipe" element={<ChefViewRecipes />} />
              <Route path="/EditSupportTicket" element={<EditSupportTicket ticket={{ customerUID: "", issue: "", issueType: "", responseMessage: "", status: "" }} onClose={() => console.log("Closed")} />} />
              <Route path="/EditSupportFeedback" element={<EditSupportFeedback feedback={{ customerUID: "", message: "" }} onClose={() => console.log("Closed")} />} />
              <Route path="/orderManagement" element={<OrderManagement />} />
              <Route path="/orderManagementNC" element={<OrderManagementNC />} />

              {/* Newly added routes from the new code */}
              <Route path="/manage" element={<Mange />} />
              <Route path="/addsup" element={<Add />} />
              <Route path="/Eupdate/:Id" element={<EditeList />} />
            </Routes>

            <ToastContainer />
          </div>
        </div>
      </div>
     
    </Router>
  );
}

export default App;
