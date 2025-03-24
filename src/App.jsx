import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login.jsx";
import ResetPassword from "./pages/Reset-Password/ResetPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard/Index.jsx";
import Dashboard from "./pages/AdminDashboard/routes/Dashboard/Dashboard.jsx";
import OrderManagement from "./pages/AdminDashboard/routes/OrderManagement/OrderManagement.jsx";
import UserManagement from "./pages/AdminDashboard/routes/UserManagement/UserManagement.jsx";
import AnalyticsAndReports from "./pages/AdminDashboard/routes/AnalyticsReports/AnalyticsAndReports.jsx";
import SubAdmin from "./pages/AdminDashboard/routes/SubAdmin/SubAdmin.jsx";
import ViewDetails from "./pages/AdminDashboard/routes/UserManagement/viewDetails.jsx";

function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/dashboard" element={<AdminDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/orderManagement"
              element={<OrderManagement />}
            />
            <Route path="/dashboard/users" element={<UserManagement />} />
            <Route path="/dashboard/users/viewdetails" element={<ViewDetails/>} />

            <Route
              path="/dashboard/analytics"
              element={<AnalyticsAndReports />}
            />
            <Route path="/dashboard/subAdmins" element={<SubAdmin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
