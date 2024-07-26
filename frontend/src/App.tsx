import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Signup } from "./Pages/Signup";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Signup></Signup>} />
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
