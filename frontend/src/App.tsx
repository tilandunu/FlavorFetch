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
import { SupportTicket } from "./Pages/SupportTicket";
import { SupportTicketDashboard } from "./Pages/SupportTicketDashboard";
import { Feedback } from "./Pages/Feedback";
import { ViewSupportFeedback } from "./Pages/ViewSupportFeedback";
import { TicketUserAccount } from "./Pages/TicketUserAccount";
import { ViewMyTickets } from "./Pages/ViewMyTickets";
import { EditSupportTicket } from "./Pages/EditSupportTicket";
import { EditSupportFeedback } from "./Pages/EditSupportFeedback";

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
                <Route path="/SupportTicket" element={<SupportTicket />} />
                <Route
                  path="/SupportTicketDashboard"
                  element={<SupportTicketDashboard />}
                />
                <Route path="/Feedback" element={<Feedback />} />
                <Route
                  path="/ViewSupportFeedback"
                  element={<ViewSupportFeedback />}
                />
                <Route
                  path="/TicketUserAccount"
                  element={<TicketUserAccount />}
                />

                <Route path="/ViewMyTickets" element={<ViewMyTickets />} />

                <Route
                  path="/EditSupportTicket"
                  element={
                    <EditSupportTicket
                      ticket={{
                        customerUID: "",
                        issue: "",
                        issueType: "",
                        responseMessage: "",
                        status: "",
                      }}
                      onClose={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  }
                />

                <Route
                  path="/EditSupportFeedback"
                  element={
                    <EditSupportFeedback
                      feedback={{
                        customerUID: "",
                        message: "",
                      }}
                      onClose={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  }
                />
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
