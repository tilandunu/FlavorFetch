import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import ChefDashboard from "./Pages/ChefDashboard";
import DriverDashboard from "./Pages/DriverDashboard";
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

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Signup></Signup>} />
                <Route path="/signup" element={<Signup></Signup>} />
                <Route path="/signin" element={<Signin></Signin>} />
                <Route path="/chefDashboard" element={<ChefDashboard />} />
                <Route path="/driverDashboard" element={<DriverDashboard />} />
                <Route
                  path="/supplierDashboard"
                  element={<SupplierDashboard />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/signupDriver" element={<SignupDriver />} />
                <Route path="/signupSupplier" element={<SignupSupplier />} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route
                  path="/customerUserProfile"
                  element={<CustomerUserProfile />}
                />
                <Route path="/ticketDashboard" element={<TicketDashboard />} />
                <Route path="/addRecipe" element={<AddRecipe />} />
                <Route path="/chefViewRecipe" element={<ChefViewRecipes />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
