import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { DataTable } from "../../../../shared/Table/data-table";
import AddServicePartner from "./AddServicePartner";
import AddAgent from "./AddAgent";
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../../../assets/avatar.png'
import { useSelector } from "react-redux";



const UserManagement = () => {
  const [activeSection, setActiveSection] = useState("customers");
  const [isAddSPModalOpen, setIsAddSPModalOpen] = useState('')
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const { users, servicePartners, agents, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  
    const onPageChange = (newPage) => {
      setCurrentPage(newPage);
    };

  const handleClick = (section) => {
    setActiveSection(section);
  };
  const handleAddSPClick = () => {
    setIsAddSPModalOpen(true)
  }
  const handleAddAgentClick = () => {
    setIsAddAgentModalOpen(true)
  }
  const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
  const AGENTS_URL = import.meta.env.VITE_GET_ALL_AGENTS;

  
 useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${AGENTS_URL}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('data:', data);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch Agents');
        }
      } catch (error) {
        console.error('Error fetching agents:', error.message);
      }
    };

    fetchAgents();
  }, []);
  const usersColumns = [
    {
      key: "firstName",
      title: "Customer Name",
      render: (users, row) => {
        console.log("Users:", row, users); // Debugging to check the structure of row

        <div className="flex items-center gap-3">
          <img
            src={row.profilePic || avatar} // Get the profile picture from row data
            
            className="w-10 h-10 rounded-full object-cover"
          />
            <span>{row?.firstName || "N/A"} {row?.lastName || ""}</span>
            </div>
      },
    },    { key: "id", title: "Customer ID No" },
    { key: "email", title: "Email address" },
    { key: "phoneNumber", title: "Contact Number" },
    // { key: "balance", title: "Wallet Balance" },
    
  ]
 
  const SPColumns = [
    {
      key: "companyName",
      title: "Company Name",
      render: (servicePartners, row) => {
        console.log("Service Partners:", row, servicePartners); // Debugging to check the structure of row
return (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePic || avatar} // Get the profile picture from row data
            alt={customer}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{customer}</span> {/* Customer name next to image */}
        </div>
)
},
    },      { key: "id", title: " ID No." },
    { key: "email", title: "Email address" },
    { key: "contactPersonName", title: "Contact Person's Name" },
    { key: "phoneNumber", title: "Contact Number" },
     ]

    
    const DAColumns = [
      {
        key: "fullName",
        title: "Agent's name",
        render: (agents, row) => {
          console.log("Agents:", row, agents); // Debugging to check the structure of row

          return (
          <div className="flex items-center gap-3">
            <img
            src={row.profilePic || avatar} // Get the profile picture from row data
            alt={customer}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{row?.fullName}</span> {/* Customer name next to image */}
          </div>
          )
        },
      },        { key: "id", title: "Agent's ID No." },
      { key: "email", title: "Email address" },
      { key: "phoneNumber", title: "Contact Number" },
       ]
  
  // Define column and data mappings
 
  console.log("Active Section:", activeSection);
  console.log("Service Partners:", servicePartners); // Debugging to check the structure of row

  


  return (
    <div className="container mx-auto py-6 px-4">
      <div className="font-bold text-3xl">User Management</div>

      {/* Search Input */}
      <div className=" flex justify-end">
     
      {activeSection !== "customers" && (
        <button 
        className="bg-[#E85C19] text-white font-bold right-10 px-3 py-2 rounded-lg 
        hover:bg-[#c74e10] transition 
        w-[120px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[60px]" onClick={activeSection === "servicePartners" ? handleAddSPClick : handleAddAgentClick}
>
        {/* <FaPlus size={20}  /> */}
                    {activeSection === "servicePartners" ? "Add Service Partner" : "Add Delivery Agent"}
          </button>
        
        )}
  </div>

      {/* Section Tabs */}
      <div className="container mx-auto  ml-3 flex mt-20 gap-10 text-gray-600">
        {["customers", "servicePartners", "deliveryAgents"].map((section) => (
          <div key={section} className="group cursor-pointer" onClick={() => handleClick(section)}>
            <h1 className={`relative text-lg transition-colors duration-500 ${activeSection === section ? "text-[#E85C13]" : "text-gray-600"}`}>
              {section.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              <span className={`absolute left-0 right-0 top-8 h-[1px] bg-[#E85C13] transition-all duration-500 ${activeSection === section ? "w-full" : "w-0"}`} />
            </h1>
          </div>
        ))}
        {isAddSPModalOpen && (
        <AddServicePartner
          isOpen={isAddSPModalOpen}
          onClose={() => setIsAddSPModalOpen(false)}
        />
      )}
      {isAddAgentModalOpen && (
        <AddAgent
          isOpen={isAddAgentModalOpen}
          onClose={() => setIsAddAgentModalOpen(false)}
        />
      )}
      </div>

      <div className="relative w-full mx-auto">
        <div className="w-full h-0.5 bg-gray-100"></div>
      </div>

      {/* Data Table */}
      <DataTable
  columns={
    activeSection === "customers" ? usersColumns :
    activeSection === "servicePartners" ? SPColumns :
    activeSection === "deliveryAgents" ? DAColumns :
    [] // Default to an empty array or your fallback case
  }
  data={
    activeSection === "customers" ? users :
    activeSection === "servicePartners" ? servicePartners :
    activeSection === "deliveryAgents" ? agents :
    []
  }
  showFooter={true}
  currentPage={currentPage}
  onPageChange={onPageChange}

  actionColumn={{
    title: "",
    render: (row) => (
      <a href="/dashboard/users/viewdetails" className="text-[#e86317] text-sm hover:underline">
        View Details
      </a>
    ),
  }}
  onRowClick={(row) => console.log("Row clicked:", row)}
/>

    </div>
  );
};

export default UserManagement;
