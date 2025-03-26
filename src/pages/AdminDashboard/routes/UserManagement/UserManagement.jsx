import { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { DataTable } from "../../../../shared/Table/data-table";
import AddServicePartner from "./AddServicePartner";
import AddAgent from "./AddAgent";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../../assets/avatar.png";
import SearchFilter from "../../../../shared/Searchbar/SearchFilter";

const UserManagement = () => {
  const [activeSection, setActiveSection] = useState("customers");
  const [isAddSPModalOpen, setIsAddSPModalOpen] = useState("");
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // List of filters
  const filters = [
    { label: "Select", value: "" },
    { label: "Customer", value: "customer" },
    { label: "ID", value: "id" },
    { label: "Payment Status", value: "paymentStatus" },
    { label: "Order Status", value: "orderStatus" },
  ];

  // Handle search and filter changes
  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setFilterBy(filter);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleClick = (section) => {
    setActiveSection(section);
  };
  const handleAddSPClick = () => {
    setIsAddSPModalOpen(true);
  };
  const handleAddAgentClick = () => {
    setIsAddAgentModalOpen(true);
  };

  const userData = [
    {
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Sample image

      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/8.jpg", // Sample image

      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Sample image

      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu jack",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Chinedu Okafor",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
    {
      customer: "Omobolanle Dende",

      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "09162577076",
      balance: "$18,000",
    },
  ];
  const usersColumns = [
    {
      key: "customer",
      title: "Customer Name",
      render: (customer, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePic || avatar} // Get the profile picture from row data
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{customer}</span> {/* Customer name next to image */}
        </div>
      ),
    },
    { key: "id", title: "Customer ID No" },
    { key: "email", title: "Email address" },
    { key: "contact", title: "Contact Number" },
    { key: "balance", title: "Wallet Balance" },
  ];
  const servicePartnersData = [
    {
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Sample image

      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      profilePic: "", // Sample image

      company: "Kao Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba jack",
      contact: "08173957359",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg", // Sample image

      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/30.jpg", // Sample image

      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/19.jpg", // Sample image

      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
    {
      company: "Kaothar jack",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba jack",
      contact: "08173957359",
    },
    {
      company: "Kaothar Wash",
      id: "0081727",
      email: "olivia@untitledui.com",
      contactPerson: "Buba Kaothar",
      contact: "08173957359",
    },
  ];

  const SPColumns = [
    {
      key: "company",
      title: "Company Name",
      render: (customer, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePic || avatar} // Get the profile picture from row data
            alt={customer}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{customer}</span> {/* Customer name next to image */}
        </div>
      ),
    },
    { key: "id", title: " ID No." },
    { key: "email", title: "Email address" },
    { key: "contactPerson", title: "Contact Person's Name" },
    { key: "contact", title: "Contact Number" },
  ];

  const DeliveryAgentsData = [
    {
      profilePic: "https://randomuser.me/api/portraits/men/50.jpg", // Sample image

      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/9.jpg", // Sample image

      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle jack",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/60.jpg", // Sample image

      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/82.jpg", // Sample image

      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Omobolanle Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
    {
      name: "Cosmos Dende",
      id: "0081727",
      email: "olivia@untitledui.com",
      contact: "08173957359",
    },
  ];
  const DAColumns = [
    {
      key: "name",
      title: "Agent's name",
      render: (customer, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePic || avatar} // Get the profile picture from row data
            alt={customer}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{customer}</span> {/* Customer name next to image */}
        </div>
      ),
    },
    { key: "id", title: "Agent's ID No." },
    { key: "email", title: "Email address" },
    { key: "contact", title: "Contact Number" },
  ];

  // Define column and data mappings

  console.log("Active Section:", activeSection);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="font-bold text-3xl">User Management</div>

      {/* Search & Filter Component */}
      {
        <div className="mt-5">
          <SearchFilter onSearch={handleSearch} filters={filters} />
        </div>
      }

      {/* Search Input */}
      <div className=" flex justify-end">
        {activeSection !== "customers" && (
          <button
            className="bg-[#E85C19] text-white font-bold right-10 px-3 py-2 rounded-lg 
        hover:bg-[#c74e10] transition 
        w-[120px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[60px]"
            onClick={
              activeSection === "servicePartners"
                ? handleAddSPClick
                : handleAddAgentClick
            }>
            {/* <FaPlus size={20}  /> */}
            {activeSection === "servicePartners"
              ? "Add Service Partner"
              : "Add Delivery Agent"}
          </button>
        )}
      </div>

      {/* Section Tabs */}
      <div className="container mx-auto  ml-3 flex mt-11 mb-5 gap-10 text-gray-600">
        {["customers", "servicePartners", "deliveryAgents"].map((section) => (
          <div
            key={section}
            className="group cursor-pointer"
            onClick={() => handleClick(section)}>
            <h1
              className={`relative text-lg transition-colors duration-500 ${
                activeSection === section ? "text-[#E85C13]" : "text-gray-600"
              }`}>
              {section
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              <span
                className={`absolute left-0 right-0 top-8 h-[1px] bg-[#E85C13] transition-all duration-500 ${
                  activeSection === section ? "w-full" : "w-0"
                }`}
              />
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
          activeSection === "customers"
            ? usersColumns
            : activeSection === "servicePartners"
            ? SPColumns
            : activeSection === "deliveryAgents"
            ? DAColumns
            : [] // Default to an empty array or your fallback case
        }
        data={
          activeSection === "customers"
            ? userData
            : activeSection === "servicePartners"
            ? servicePartnersData
            : activeSection === "deliveryAgents"
            ? DeliveryAgentsData
            : [] // Default to an empty array or your fallback case
        }
        showFooter={true}
        currentPage={currentPage}
        searchTerm={searchTerm}
        onPageChange={onPageChange}
        actionColumn={{
          title: "",
          render: (row) => (
            <a
              href="/dashboard/users/viewdetails"
              className="text-[#e86317] text-sm hover:underline">
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
