import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import logo from "../assets/white-logo.png";
import { GrAnalytics, GrUserAdmin } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import FeedbackModal from "./modal";
import { resetAdmin } from "../redux/LoggedInAdminSlice";
import { resetAnalytics } from "../redux/AnalyticsSlice";
import { resetOrders } from "../redux/OrderMangementSlice";
import { resetSelectedOrder } from "../redux/OrderSlice";
import { resetSubadmin } from "../redux/Sub-adminSlice";
import { resetUser } from "../redux/UserSlice";
import { resetWallet } from "../redux/WalletSlice";
import { openModal, closedModal } from "../redux/uiSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminDetails = useSelector((state) => state.admin.adminDetails);
  const location = useLocation();
  const currentRoute = location.pathname;
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "Are you sure you want to logout?",
    description: "",
    redirectPath: "/dashboard",
  });
  const closeModal = () => {
    setModalConfig({ ...modalConfig, show: false });
    dispatch(closedModal());
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("sessionId");
    sessionStorage.removeItem("token");
    dispatch(resetAdmin());
    dispatch(resetAnalytics());
    dispatch(resetOrders());
    dispatch(resetSelectedOrder());
    dispatch(resetSubadmin());
    dispatch(resetUser());
    dispatch(resetWallet());
    navigate("/");
  };

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
    // adminDetails.userType === "ADMIN" &&
    {
      path: "/dashboard/subAdmins",
      name: "Sub-Admins",
      icon: <GrUserAdmin size={24} />,
    },
    {
      path: "",
      name: "Sign Out",
      icon: <MdOutlineLogout size={24} />,
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
              onClick={() => {
                if (item.name === "Sign Out") {
                  dispatch(openModal());
                  setModalConfig({
                    show: true,
                    type: "success",
                    title: "Sign Out",
                    description: "Are You Sure You Want To Sign Out?.",
                  });
                } else {
                  return;
                }
              }}
              to={item.name === "Sign Out" ? null : item.path}
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
      <div>
        {modalConfig.show && (
          <FeedbackModal
            type={modalConfig.type}
            title={modalConfig.title}
            description={modalConfig.description}
            buttonText={
              modalConfig.type === "success" ? "Continue" : "Try Again"
            }
            redirectPath={modalConfig.redirectPath}
            onClose={closeModal}
            onButtonClick={handleSignout}
            primaryColor="#E85C13"
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
