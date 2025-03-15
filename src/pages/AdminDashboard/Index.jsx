import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";

const AdminDashboard = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-grow ml-24 p-6 md:ml-70 overflow-y-auto h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
