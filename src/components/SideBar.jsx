import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { MdAccountBalance, MdOutlineMenuBook } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import logo from "../assets/white-logo.png";
import { GrAnalytics, GrUserAdmin } from "react-icons/gr";

const Sidebar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const sideBarItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <RxDashboard size={24} />,
    },
    {
      path: "/dashboard/orderManagement",
      name: "Order Management",
      icon: <MdOutlineMenuBook size={24} />,
    },
    {
      path: "/dashboard/users",
      name: "User Management",
      icon: <FaUser size={24} />,
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics and Report",
      icon: <GrAnalytics size={24} />,
    },
    {
      path: "/dashboard/subAdmins",
      name: "Sub-Admins",
      icon: <GrUserAdmin size={24} />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen bg-[#E86317] p-4 text-white font-bold w-24 md:w-70 transition-all duration-300">
      <div className="mb-11 mt-5">
        <img
          className="h-[25px] md:h-[40px] w-[100%] md:w-[70%] m-auto"
          src={logo}
          alt="logo"
        />
      </div>

      <ul>
        {sideBarItems.map((item, i) => (
          <li key={i} className="mb-5">
            <Link
              to={item.path}
              className={`text-sm ${
                currentRoute === item.path
                  ? "text-[#E86317] bg-white"
                  : "text-white"
              } block p-2 rounded`}>
              <div className="flex items-center gap-2 md:text-md">
                <span>{item?.icon}</span>
                <span className="hidden md:block">{item.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
