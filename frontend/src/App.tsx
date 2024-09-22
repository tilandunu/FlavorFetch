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



import Homee from "./Pages/favorite/Home.tsx";
import Profil from "./Pages/favorite/profil.tsx";
import Fa from "./Pages/favorite/favorite.tsx";
import Update from "./Pages/favorite/update.tsx";

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



                <Route path="/profile" element={<Profil  />} />
                 <Route path="/favourite" element={<Fa  />} />
                 <Route path="/update/:upId" element={<Update />} />
                 <Route path="/add" element={<Homee />} />
         

               
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
