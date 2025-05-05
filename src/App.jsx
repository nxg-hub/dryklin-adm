import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/Login.jsx";
import ResetPassword from "./pages/Reset-Password/ResetPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard/Index.jsx";
import Dashboard from "./pages/AdminDashboard/routes/Dashboard/Dashboard.jsx";
import OrderManagement from "./pages/AdminDashboard/routes/OrderManagement/OrderManagement.jsx";
import UserManagement from "./pages/AdminDashboard/routes/UserManagement/UserManagement.jsx";
import AnalyticsAndReports from "./pages/AdminDashboard/routes/AnalyticsReports/AnalyticsAndReports.jsx";
import SubAdmin from "./pages/AdminDashboard/routes/SubAdmin/SubAdmin.jsx";
import OTPValidationPage from "./pages/Reset-Password/OTP-Validation.jsx";
import NewPasswordPage from "./pages/Reset-Password/NewPassword.jsx";
import ViewDetails from "./pages/AdminDashboard/routes/UserManagement/viewDetails.jsx";
import OrderDetails from "./pages/AdminDashboard/routes/OrderManagement/OrderDetails.jsx";
import SubAdminDetails from "./pages/AdminDashboard/routes/SubAdmin/SubAdminDetails.jsx";

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-validation" element={<OTPValidationPage />} />
          <Route path="/confirm-password" element={<NewPasswordPage />} />
          <Route exact path="/dashboard" element={<AdminDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/orderManagement"
              element={<OrderManagement />}
            />
            <Route
              path="/dashboard/orderManagement/orderDetails"
              element={<OrderDetails />}
            />
            <Route path="/dashboard/users" element={<UserManagement />} />
            <Route
              path="/dashboard/users/viewdetails"
              element={<ViewDetails />}
            />

            <Route
              path="/dashboard/analytics"
              element={<AnalyticsAndReports />}
            />
            <Route path="/dashboard/subAdmins" element={<SubAdmin />} />
            <Route
              path="/dashboard/subAdmins/sub-admin-details"
              element={<SubAdminDetails />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
