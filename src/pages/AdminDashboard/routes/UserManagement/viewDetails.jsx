import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { FaRegCopy } from "react-icons/fa"; // Import from React Icons
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa"; // Import icons
import DeactivateModal from "./deactivateModal";
import ConfirmDeleteModal from "./confirmDeleteModal";



 const ViewDetails = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState("");
    const [deleted, setDeleted] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState('')
    const [isConfirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState('')




    const handleBack = () => {
        // Navigate to the desired route (e.g., "/dashboard/users")
        navigate('/dashboard/users');
      };
      const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(""), 2000); // Reset after 2 seconds
      };

      const handleDelete = () => {
        setDeleted(true); // Simulate delete action
        setTimeout(() => setDeleted(false), 2000); // Reset after 2 seconds (optional)
      };

      const handleDeactivateClick = () => {
        setIsDeactivateModalOpen(true)
      }
      const handleConfirmDeleteClick = () => {
        setConfirmDeleteModalOpen(true)
      }

    return (
        <div className="container mx-auto py-6 px-4">
          <div className="font-bold text-3xl">User Management</div>
          <button
      onClick={handleBack}
      className="mt-5 text-black text-xl font-medium flex items-center gap-5 hover:underline"
    >
      <ChevronLeft className="h-8 w-8" /> 
      Back 
    </button>
          <div       className="mt-5 text-black text-xl font-medium flex items-center gap-5 "
          >
          <img className="mt-8 h-25 w-25 rounded-full" src= "https://randomuser.me/api/portraits/men/1.jpg" // Sample image
 alt="User Image" />
          <div>
    <h2 className="mt-5 font-bold text-2xl">David James</h2>
    <p className="text-sm text-gray-400 mt-1">ID No: 12344rde</p>
  </div>
          </div>
          <div className="container p-6 flex flex-col md:flex-row md:justify-between gap-6 mt-5 text-black">
      
      {/* Section 1 */}
      <div className="group w-full md:w-auto">
      <h1 className="text-[#E85C13] text-2xl font-bold relative ">
          First Name 
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-1xl">David</h2>
          <FaRegCopy
            className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
            onClick={() => handleCopy("David", "First Name")}
          />
          {copied === "First Name" && <span className="text-sm text-green-500">Copied!</span>}
        </div>
      </div>
  
      {/* Section 2 */}
      <div className="group w-full md:w-auto">
      <h1 className="text-[#E85C13] text-2xl font-bold relative ">
      Last Name
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-1xl">James</h2>
          <FaRegCopy
            className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
            onClick={() => handleCopy("James", "Last Name")}
          />
          {copied === "Last Name" && <span className="text-sm text-[#E85C13]">Copied!</span>}
        </div>
      </div>
  
      {/* Section 3 */}
      <div className="group w-full md:w-auto">
      <h1 className="text-[#E85C13] text-2xl font-bold relative ">
      Username
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-1xl">James1212</h2>
          <FaRegCopy
            className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
            onClick={() => handleCopy("James1212", "Username")}
          />
          {copied === "Username" && <span className="text-sm text-[#E85C13]">Copied!</span>}
        </div>
      </div>
      
    </div>
    <div className="container p-6 flex flex-col md:flex-row md:justify-between gap-6 mt-3 text-black">
      
      {/* Section 1 */}
      <div className="group w-full md:w-auto">
      <h1 className="text-[#E85C13] text-2xl font-bold relative ">
          Email Address
          </h1>
          <div className="flex items-center gap-2 mt-3">
          <h2 className="text-1xl">Jamesdavid@gmail.com</h2>
          <FaRegCopy
            className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
            onClick={() => handleCopy("Jamesdavid@gmail.com", "Email Address")}
          />
          {copied === "Jamesdavid@gmail.com" && <span className="text-sm text-[#E85C13]">Copied!</span>}
        </div>
      </div>
  
      {/* Section 2 */}
      <div className="group w-full md:w-auto">
      <h1 className="text-[#E85C13] text-2xl font-bold relative ">
      Phone Number
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-1xl">09123456789</h2>
          <FaRegCopy
            className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
            onClick={() => handleCopy("09123456789", "Phone Number")}
          />
          {copied === "Phone Number" && <span className="text-sm text-[#E85C13]">Copied!</span>}
        </div>
      </div>
  
      {/* Section 3 */}
      <div className="group w-full md:w-auto">
      <h1 className="text-[#E85C13] text-2xl font-bold relative ">
      Total no. of orders
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <h2 className="text-1xl">09123456789</h2>
          <FaRegCopy
            className="ml-8 h-5 w-5 text-gray-400 cursor-pointer hover:text-black"
            onClick={() => handleCopy("234", "Total no. of orders")}
          />
          {copied === "Total no. of orders" && <span className="text-sm text-[#E85C13]">Copied!</span>}
        </div>
      </div>
      
    </div>
    <div className="font-bold text-2xl">Address</div>
          <div className="container p-6 flex flex-col md:flex-row md:justify-between gap-6 mt-5 text-black">
      
      {/* Section 1 */}
      
      <div className="group w-full md:w-auto">
        <h1 className="text-black text-lg font-bold relative flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500 h-5 w-5" /> {/* Location Icon */}
          Jogor Center, Ibadan, Nigeria
        </h1>
        <div className="flex items-center gap-2 mt-5">
          <h2 className="text-xl">Jogor Center, Ibadan, Nigeria</h2>
          <div className="flex items-center gap-1 ml-8 cursor-pointer" onClick={handleDelete}>
            <FaTrash className="h-5 w-5 text-[#E85C13] hover:text-red-600" /> {/* Delete Icon */}
            <span className="text-sm text-[#E85C13] hover:text-red-600">Delete</span>
          </div>
        </div>
      </div>
      <div className="group w-full md:w-auto">
        <h1 className="text-black text-lg font-bold relative flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500 h-5 w-5" /> {/* Location Icon */}
          New Sabo, Mokola, Ibadan, Nigeria
        </h1>
        <div className="flex items-center gap-2 mt-5">
          <h2 className="text-xl"> New Sabo, Mokola, Ibadan, Nigeria
          </h2>
          <div className="flex items-center gap-1 ml-8 cursor-pointer" onClick={handleDelete}>
            <FaTrash className="h-5 w-5 text-[#E85C13] hover:text-red-600" /> {/* Delete Icon */}
            <span className="text-sm text-[#E85C13] hover:text-red-600">Delete</span>
          </div>
        </div>
      </div>
      
  
      </div>
      <div className="container px-10 mt-20 flex justify-end text-black">
  <div className="flex items-center gap-5"> 
    {/* Delete Text */}
    
    <button className="text-xl text-[#E85C13]"
    onClick={handleConfirmDeleteClick}>Delete Permanently</button>

    {/* Deactivate Button */}
    <button className="bg-[#E85C19] text-white px-8 py-4 rounded-lg hover:bg-[#c74e10] transition flex items-center gap-2"
    onClick={handleDeactivateClick}>
      Deactivate User
    </button>
    {isDeactivateModalOpen && (
        <DeactivateModal
          isOpen={isDeactivateModalOpen}
          onClose={() => setIsDeactivateModalOpen(false)}
          back={handleBack}
        />
      )}
      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteModalOpen}
          onClose={() => setConfirmDeleteModalOpen(false)}
          back={handleBack}

        />
      )}
  </div>
</div>


    
          </div>
    )

 }

 export default ViewDetails;