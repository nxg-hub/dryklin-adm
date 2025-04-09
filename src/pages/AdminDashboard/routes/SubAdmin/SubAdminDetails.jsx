import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { FaRegCopy } from "react-icons/fa"; // Import from React Icons
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa"; // Import icons
import avatar from "../../../../assets/avatar.png";
import FeedbackModal from "../../../../components/modal";
import { fetchSubAdmins } from "../../../../redux/Sub-adminSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmSuspendModal from "./confirmSuspendModal";

const SubAdminDetails = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [deleted, setDeleted] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState("");
  const [isConfirmSuspendModalOpen, setConfirmSuspendModalOpen] = useState("");
  const selectedSubadmin = useSelector((state) => state.subadmin.selectedSubadmin);
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "success",
    title: "",
    description: "",
  });

  

  const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;

  const handleBack = () => {
    navigate(-1);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000); // Reset after 2 seconds
  };

  
  const dateCreated = selectedSubadmin?.dateCreated;

  let formattedDate = "";
  
  if (Array.isArray(dateCreated) && dateCreated.length >= 3) {
    const [year, month, day] = dateCreated;
    formattedDate = `${month}/${day}/${year}`;
  }

  const handleConfirmSuspendClick = () => {
    setConfirmSuspendModalOpen(true);
  };

  const handleDeactivateClick = async () => {
    setIsLoading(true);

    if (!selectedSubadmin?.id) {
      console.error("No user selected");
      return;
    }
    const token = sessionStorage.getItem("token");


    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/subadmins/deactivate?email=${selectedSubadmin?.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

          },
          body: JSON.stringify({ email: selectedSubadmin.email }),
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
          title: "Subadmin Deactivated",
          description: "You have successfully deactivated Subadmin.",
          redirectPath: "/dashboard/subAdmins",
        });
       dispatch(fetchSubAdmins());

        
      } else {
        setModalConfig({
          show: true,
          type: "error",
          title: "Action failed",
          description:
            typeof result === "string"
              ? result
              : result.message || "Failed to deactivate sub-admin.",
          redirectPath: null,
        });
      }
    } catch (err) {
      console.error("Error deactivating sub-admin:", err);

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

  if (!selectedSubadmin) return <p>No details found.</p>;

  

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="font-bold text-3xl">Sub-Admin</div>
      <button
        onClick={handleBack}
        className="mt-5 text-black text-xl font-medium flex items-center gap-5 hover:underline hover:text-[#c74e10] group-hover:decoration-[#c74e10]">
        <ChevronLeft className="h-8 w-8" />
        Back
      </button>
      <div className="mt-5 text-black text-xl font-medium flex items-center gap-5 ">
        <img
          className="mt-8 h-25 w-25 rounded-full"
          src={selectedSubadmin?.ProfilePic || avatar}
          alt="User Image"
        />
        </div>
      <div className="container p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 text-black">
        {[
          {
            label: "First Name",
            value:
              selectedSubadmin?.firstName || selectedUser?.companyName || firstname,
          },
          { label: "Last Name", value: selectedSubadmin?.lastName || lastname },
          { label: "Email Address", value: selectedSubadmin?.email },
          { label: "Phone Number", value: selectedSubadmin?.phoneNumber },
          {
            label: "Password",
            value: selectedSubadmin?.password?.length > 10
              ? `${selectedSubadmin.password.slice(0, 10)}...`
              : selectedSubadmin?.password
          },
          { label: "Date Created", value: formattedDate },

          
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
      
      <div className="container px-10 mt-20 flex justify-end text-black">
  <div className="flex items-center gap-5"> 
    
<button 
  className={`text-xl ${selectedSubadmin?.suspended === true ? 'text-gray-400 cursor-not-allowed' : 'text-[#E85C13]'}`}
  onClick={handleConfirmSuspendClick}
  disabled={selectedSubadmin?.suspended === true}
>
  {selectedSubadmin?.suspended === true ? 'User Suspended' : 'Suspend User'}
</button>


{/* Deactivate Button */}
<button 
  className={`bg-[#E85C19] text-white px-8 py-4 rounded-lg flex items-center gap-2 transition 
             ${selectedSubadmin?.enabled === false ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-[#c74e10]'}`}
  onClick={handleDeactivateClick}
  disabled={selectedSubadmin?.enabled === false || isLoading}
>
  {isLoading 
    ? 'Please Wait...' 
    : selectedSubadmin?.enabled === false 
      ? 'User Deactivated' 
      : 'Deactivate User'}
</button>


    
      {isConfirmSuspendModalOpen && (
        <ConfirmSuspendModal
          isOpen={isConfirmSuspendModalOpen}
          onClose={() => setConfirmSuspendModalOpen(false)}
          back={handleBack}

        />
      )}
       {modalConfig.show && (
                                  <FeedbackModal
                                      type={modalConfig.type}
                                      title={modalConfig.title}
                                      description={modalConfig.description}
                                      buttonText={modalConfig.type === "success" ? "Continue" : "Try Again"}
                                      redirectPath={modalConfig.redirectPath}
                                      onClose={closeModal}
                                      onButtonClick={modalConfig.type === "success" ? null : closeModal}
                                      primaryColor="#E85C13"
                                  />
                              )}
  </div>
</div>  
          </div>
    )

 }

export default SubAdminDetails;
