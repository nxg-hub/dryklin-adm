import { useEffect, useState } from "react";
import { DataTable } from "../../../../shared/Table/data-table";
import AddServicePartner from "./AddServicePartner";
import AddAgent from "./AddAgent";
import { useNavigate } from "react-router-dom";
import avatar from "../../../../assets/avatar.png";
import SearchFilter from "../../../../shared/Searchbar/SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../../redux/UserSlice";
import Header from "../../../../shared/Section-Header/header";
import { fetchWalletDetails } from "../../../../redux/WalletSlice";


const UserManagement = () => {
  const [activeSection, setActiveSection] = useState("customers");
  const [isAddSPModalOpen, setIsAddSPModalOpen] = useState("");
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const walletBalances = useSelector((state) => state.wallet.walletBalances);
  const { user, servicePartners, agents } = useSelector((state) => state.user);
  const adminDetails = useSelector((state) => state.admin.adminDetails);

  const navigate = useNavigate();

  const filters = [
    { label: "Select", value: "" },
    { label: "Customer", value: "customer" },
    { label: "ID", value: "id" },
    { label: "Payment Status", value: "paymentStatus" },
    { label: "Order Status", value: "orderStatus" },
  ];

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

  useEffect(() => {
    user?.forEach((user) => {
      if (user.walletId && !walletBalances[user.walletId]) {
        dispatch(fetchWalletDetails(user.walletId));
      }
    });
  }, [user, dispatch, walletBalances]);
  const selectedData = Array.isArray(
    activeSection === "customers"
      ? user
      : activeSection === "servicePartners"
      ? servicePartners
      : activeSection === "deliveryAgents"
      ? agents
      : []
  )
    ? activeSection === "customers"
      ? user
      : activeSection === "servicePartners"
      ? servicePartners
      : activeSection === "deliveryAgents"
      ? agents
      : []
    : [];

  const usersColumns = [
    {
      key: "firstName",
      title: "Customer Name",
      render: (user, row) => {
        return (
          <div className="flex items-center gap-3">
            <img
              src={row.profilePic || avatar}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>
              {row?.firstName} {row?.lastName}
            </span>
          </div>
        );
      },
    },
    {
      key: "id",
      title: " ID No.",
      render: (text) => (text.length > 10 ? text.slice(0, 8) + "..." : text),
    },
    { key: "email", title: "Email address" },
    { key: "phoneNumber", title: "Contact Number" },
    {
      key: "balance",
      title: "Wallet Balance",
      render: (user, row) => (
        <span>
          {walletBalances[row.walletId] !== undefined
            ? `₦${walletBalances[row.walletId]}`
            : "NIL"}
        </span>
      ),
    },
  ];

  const SPColumns = [
    {
      key: "companyName",
      title: "Company Name",
      render: (servicePartners, row) => {
        console.log("Service Partners:", row, servicePartners);
        return (
          <div className="flex items-center gap-3">
            <img
              src={row.profilePic || avatar}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{row?.companyName}</span>
          </div>
        );
      },
    },
    {
      key: "id",
      title: " ID No.",
      render: (text) => (text.length > 10 ? text.slice(0, 8) + "..." : text),
    },
    { key: "email", title: "Email address" },
    { key: "contactPersonName", title: "Contact Person's Name" },
    { key: "phoneNumber", title: "Contact Number" },
  ];

  const DAColumns = [
    {
      key: "fullName",
      title: "Agent's name",
      render: (agents, row) => {
        console.log("Agents:", row, agents);

        return (
          <div className="flex items-center gap-3">
            <img
              src={row.profilePic || avatar}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{row?.fullName}</span>
          </div>
        );
      },
    },
    {
      key: "id",
      title: "ID No.",
      render: (text) => (text.length > 10 ? text.slice(0, 8) + "..." : text),
    },
    { key: "email", title: "Email address" },
    { key: "phoneNumber", title: "Contact Number" },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <Header
        title="User Management"
        
        userName={adminDetails?.firstName}
        userEmail={adminDetails?.email}
        userImage={adminDetails?.profileImage || avatar}
      />

      {/* Search & Filter Component */}

      <div className="mt-8 flex items-center justify-between">
<div className="flex">
      <SearchFilter onSearch={handleSearch} filter={filters} />
      </div>
<div className="flex justify-end">
      
        {activeSection !== "customers" && (
          <button
            className="bg-[#E85C19]  text-white font-bold px-3 py-2 rounded-lg 
        hover:bg-[#c74e10] transition 
        w-[120px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[60px]"
            onClick={
              activeSection === "servicePartners"
                ? handleAddSPClick
                : handleAddAgentClick
            }>
            {activeSection === "servicePartners"
              ? "Add Service Partner"
              : "Add Delivery Agent"}
          </button>
        )}
        
</div>
</div>
      {/* Section Tabs */}
      <div className="container mx-auto  flex  mb-5 gap-10 text-gray-600">
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
            : []
        }
        data={selectedData}
        searchTerm={searchTerm}
        showFooter={true}
        currentPage={currentPage}
        onPageChange={onPageChange}
        actionColumn={{
          title: "",
          render: (row) => (
            <a
              href="#"
              className="text-[#e86317] text-sm hover:underline"
              onClick={(e) => {
                e.preventDefault(); 
                dispatch(
                  setSelectedUser({
                    userId: row.id,
                    data: row, 
                  })
                );
                navigate("/dashboard/users/viewdetails");
              }}>
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
