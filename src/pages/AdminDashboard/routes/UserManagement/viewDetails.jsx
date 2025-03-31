import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { FaRegCopy } from "react-icons/fa"; // Import from React Icons
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa"; // Import icons
import DeactivateModal from "./deactivateModal";
import ConfirmDeleteModal from "./confirmDeleteModal";
import avatar from "../../../../assets/avatar.png";
import FeedbackModal from "../../../../components/modal";

import { useSelector } from "react-redux";

const ViewDetails = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [deleted, setDeleted] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState("");
  const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState("");
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
  });

  // const handleDeactivateClick = () => {
  //   setIsDeactivateModalOpen(true);
  // };
  // const handleConfirmDeleteClick = () => {
  //   setConfirmDeleteModalOpen(true);
  // };

  const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;

  const handleBack = () => {
    navigate("/dashboard/users");
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000); // Reset after 2 seconds
  };

  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => setDeleted(false), 2000);
  };

  const handleConfirmDeleteClick = () => {
    setConfirmDeleteModalOpen(true);
  };

  const handleDeactivateClick = async () => {
    setIsLoading(true);

    if (!selectedUser?.id) {
      console.error("No user selected");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/${selectedUser.id}/deactivate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: selectedUser.id }),
        }
      );

      let result;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      // ✅ Check if the response is a success
      if (response.ok) {
        setModalConfig({
          show: true,
          type: "success",
          title: "User Deactivated",
          description: "You have successfully deactivated this user.",
          redirectPath: "/dashboard/users",
        });

        setTimeout(() => {
          onClose(); // ✅ Close modal
          navigate("/dashboard/users"); // ✅ Redirect
        }, 2000);
      } else {
        setModalConfig({
          show: true,
          type: "error",
          title: "Action failed",
          description:
            typeof result === "string"
              ? result
              : result.message || "Failed to deactivate user.",
          redirectPath: null,
        });
      }
    } catch (err) {
      console.error("Error deactivating user:", err);

      setModalConfig({
        show: true,
        type: "error",
        title: "Error",
        description: "An error occurred. Please try again later.",
        redirectPath: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  if (!selectedUser) return <p>No user details found.</p>;

  const fullName = selectedUser?.fullName || "";
  const nameParts = fullName.split(" ");
  const firstname = nameParts[0] || "";
  const lastname = nameParts.slice(1).join(" ") || "";

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="font-bold text-3xl">User Management</div>
      <button
        onClick={handleBack}
        className="mt-5 text-black text-xl font-medium flex items-center gap-5 hover:underline hover:text-[#c74e10] group-hover:decoration-[#c74e10]">
        <ChevronLeft className="h-8 w-8" />
        Back
      </button>
      <div className="mt-5 text-black text-xl font-medium flex items-center gap-5 ">
        <img
          className="mt-8 h-25 w-25 rounded-full"
          src={selectedUser?.ProfilePic || avatar}
          alt="User Image"
        />
        <div>
          <h2 className="mt-5 font-bold text-2xl">
            {selectedUser?.firstName ||
              selectedUser?.companyName ||
              selectedUser?.fullName}{" "}
            {selectedUser?.lastName}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            ID NO. : {selectedUser?.id}
          </p>
        </div>
      </div>
      <div className="container p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 text-black">
        {[
          {
            label: "First Name",
            value:
              selectedUser?.firstName || selectedUser?.companyName || firstname,
          },
          { label: "Last Name", value: selectedUser?.lastName || lastname },
          { label: "Username", value: selectedUser?.dryKlinUserName },
          { label: "Email Address", value: selectedUser?.email },
          { label: "Phone Number", value: selectedUser?.phoneNumber },
          {
            label: "Total no. of orders",
            value: selectedUser?.NumberOfOrders || "NIL",
          },
        ].map(({ label, value }) => (
          <div key={label} className="group w-full">
            <h1 className="text-[#E85C13] text-2xl font-bold relative">
              {label}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <h2 className="text-1xl">{value}</h2>
              <FaRegCopy
                className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
                onClick={() => handleCopy(value, label)}
              />
              {copied === label && (
                <span className="text-sm text-[#E85C13]">Copied!</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="font-bold text-2xl">Address</div>
      <div className="container p-6 flex flex-col md:flex-row md:justify-between gap-6 mt-5 text-black">
        {/* Section 1 */}

        <div className="group w-full md:w-auto">
          <h1 className="text-black text-lg font-bold relative flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500 h-5 w-5" />{" "}
            {/* Location Icon */}
            {selectedUser?.state ||
              selectedUser?.location ||
              selectedUser?.address}
          </h1>
          <div className="flex items-center gap-2 mt-5">
            <h2 className="text-xl">
              {selectedUser?.state ||
                selectedUser?.location ||
                selectedUser?.address}
            </h2>
            <div
              className="flex items-center gap-1 ml-8 cursor-pointer"
              onClick={handleDelete}>
              <FaTrash className="h-5 w-5 text-[#E85C13] hover:text-red-600" />{" "}
              {/* Delete Icon */}
              <span className="text-sm text-[#E85C13] hover:text-red-600">
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className="group w-full md:w-auto">
          <h1 className="text-black text-lg font-bold relative flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500 h-5 w-5" />{" "}
            {/* Location Icon */}
            {selectedUser?.state ||
              selectedUser?.location ||
              selectedUser?.address}
          </h1>
          <div className="flex items-center gap-2 mt-5">
            <h2 className="text-xl">
              {selectedUser?.state ||
                selectedUser?.location ||
                selectedUser?.address}{" "}
            </h2>
            <div
              className="flex items-center gap-1 ml-8 cursor-pointer"
              onClick={handleDelete}>
              <FaTrash className="h-5 w-5 text-[#E85C13] hover:text-red-600" />{" "}
              {/* Delete Icon */}
              <span className="text-sm text-[#E85C13] hover:text-red-600">
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className="font-bold text-2xl">Address</div>
        <div className="container p-6 flex flex-col md:flex-row md:justify-between gap-6 mt-5 text-black">
          {/* Section 1 */}

          <div className="group w-full md:w-auto">
            <h1 className="text-black text-lg font-bold relative flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500 h-5 w-5" />{" "}
              {/* Location Icon */}
              Jogor Center, Ibadan, Nigeria
            </h1>
            <div className="flex items-center gap-2 mt-5">
              <h2 className="text-xl">Jogor Center, Ibadan, Nigeria</h2>
              <div
                className="flex items-center gap-1 ml-8 cursor-pointer"
                onClick={handleDelete}>
                <FaTrash className="h-5 w-5 text-[#E85C13] hover:text-red-600" />{" "}
                {/* Delete Icon */}
                <span className="text-sm text-[#E85C13] hover:text-red-600">
                  Delete
                </span>
              </div>
            </div>
          </div>
          <div className="group w-full md:w-auto">
            <h1 className="text-black text-lg font-bold relative flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500 h-5 w-5" />{" "}
              {/* Location Icon */}
              New Sabo, Mokola, Ibadan, Nigeria
            </h1>
            <div className="flex items-center gap-2 mt-5">
              <h2 className="text-xl"> New Sabo, Mokola, Ibadan, Nigeria</h2>
              <div
                className="flex items-center gap-1 ml-8 cursor-pointer"
                onClick={handleDelete}>
                <FaTrash className="h-5 w-5 text-[#E85C13] hover:text-red-600" />{" "}
                {/* Delete Icon */}
                <span className="text-sm text-[#E85C13] hover:text-red-600">
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-10 mt-20 flex justify-end text-black">
          <div className="flex items-center gap-5">
            {/* Delete Text */}

            {/* <button className="text-xl text-[#E85C13]" */}
            {/* onClick={handleConfirmDeleteClick}>Suspend User</button> */}

            {/* Deactivate Button */}
            {/* <button className="bg-[#E85C19] text-white px-8 py-4 rounded-lg hover:bg-[#c74e10] transition flex items-center gap-2" */}
            {/* onClick={handleDeactivateClick}> */}
            {/* {isLoading ? 'Please Wait...' : 'Deactivate User'}               */}
            {/* </button> */}

            {/* Suspend Button */}
            <button
              className={`text-xl ${
                selectedUser?.suspended === true
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#E85C13]"
              }`}
              onClick={handleConfirmDeleteClick}
              disabled={selectedUser?.suspended === true}>
              {selectedUser?.suspended === true
                ? "User Suspended"
                : "Suspend User"}
            </button>

            {/* Deactivate Button */}
            <button
              className={`bg-[#E85C19] text-white px-8 py-4 rounded-lg flex items-center gap-2 transition 
             ${
               selectedUser?.enabled === false
                 ? "bg-gray-400 cursor-not-allowed"
                 : "hover:bg-[#c74e10]"
             }`}
              onClick={handleDeactivateClick}
              disabled={selectedUser?.enabled === false || isLoading}>
              {isLoading
                ? "Please Wait..."
                : selectedUser?.enabled === false
                ? "User Deactivated"
                : "Deactivate User"}
            </button>

            {isConfirmDeleteModalOpen && (
              <ConfirmDeleteModal
                isOpen={isConfirmDeleteModalOpen}
                onClose={() => setConfirmDeleteModalOpen(false)}
                back={handleBack}
              />
            )}
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
                onButtonClick={
                  modalConfig.type === "success" ? null : closeModal
                }
                primaryColor="#E85C13"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
