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
//import { User, Users } from "lucide-react";
//import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from "./Pages/Users";
import UpdateUsers from "./Pages/UpdateUser";
import CreateUser from "./Pages/CreateUser";
import { User } from "lucide-react";
import { useState } from "react";
import UpdateSupplierOrder from "./Pages/UpdateSupplierOrder";
import CreateSupplierOrder from "./Pages/CreateSupplierOrder";
import SupplierOrder from "./Pages/SupplierOrder";

function App() {
  const[count,setcount]=useState(0)

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
                <Route path='/' element={<Users/>}></Route>
                <Route path="/driverDashboard" element={<DriverDashboard />} />
                <Route path="/Users" element={<Users />} />

                <Route path="/SupplierOrder" element={<SupplierOrder/>} />

                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/signupDriver" element={<SignupDriver />} />
                <Route path="/Supplier" element={<SignupDriver />} />        
                <Route path='/create' element={<CreateUser/>}/>
                <Route path='/Update/:id' element={<UpdateUsers/>}/>

                <Route path='/CreateSupplierOrder' element={<CreateSupplierOrder/>}/>
                <Route path='/UpdateSupplierOrder/:id' element={<UpdateSupplierOrder/>}/>
                
     


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
