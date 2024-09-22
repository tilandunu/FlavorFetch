import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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

import DriverDashboard from "./Pages/Driver/Dashboard";
import Role from "./Pages/Driver/DeleveryHistory.tsx";
import UserManagement from "./Pages/Driver/UserManagement";

import UpOrder from "./components/UpdateOrder/UpOrder.tsx"

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
               
                <Route
                  path="/supplierDashboard"
                  element={<SupplierDashboard />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/signupDriver" element={<SignupDriver />} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route
                  path="/customerUserProfile"
                  element={<CustomerUserProfile />}
                />
                <Route path="/ticketDashboard" element={<TicketDashboard />} />

                <Route path="/driverdashboard" element={<DriverDashboard />} />
                <Route path="/role-management" element={<Role />} />
                <Route path="/orderdetails/:id" element={<UpOrder />} />
                <Route path="/user-management" element={<UserManagement />} /> 

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
