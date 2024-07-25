import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import { CreateBlog } from "./Pages/CreateBlog";
import YourBlogs from "./Pages/YourBlogs";
import { UpdateBlogs } from "./Pages/UpdateBlogs";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createBlog" element={<CreateBlog />} />
              <Route path="/viewBlog" element={<YourBlogs />} />
              <Route path="/updateBlog/:id" element={<UpdateBlogs />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
