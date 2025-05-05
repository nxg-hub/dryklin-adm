import { useEffect, useState } from "react";
import { DataTable } from "../../../../shared/Table/data-table";
import { useNavigate } from "react-router-dom";
import avatar from "../../../../assets/avatar.png";
import Header from "../../../../shared/Section-Header/header";
import SearchFilter from "../../../../shared/Searchbar/SearchFilter";
import AddSubAdmin from "./AddSubAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubAdmins,
  setSelectedSubadmin,
} from "../../../../redux/Sub-adminSlice";

const SubAdmin = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isAddSAModalOpen, setIsAddSAModalOpen] = useState("");
  const adminDetails = useSelector((state) => state.admin.adminDetails);
  const subadmins = useSelector((state) => state.subadmin.subadmins);

  useEffect(() => {
    dispatch(fetchSubAdmins());
  }, []);

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

  const handleAddSAClick = () => {
    setIsAddSAModalOpen(true);
  };

  const dateCreated = subadmins?.dateCreated;

  let formattedDate = "";

  if (Array.isArray(dateCreated) && dateCreated.length >= 3) {
    const [year, month, day] = dateCreated;
    formattedDate = `${month}/${day}/${year}`;
  }

  const SubAdminColumns = [
    {
      key: "firstName",
      title: "Name",
      render: (subadmins, row) => {
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
    { key: "email", title: "Email Address" },
    { key: "phoneNumber", title: "Contact Number" },

    {
      key: "date",
      title: "Date Created",
      render: (subadmins, row) => {
        const dateCreated = row.dateCreated;

        let formattedDate = "";

        if (Array.isArray(dateCreated) && dateCreated.length >= 3) {
          const [year, month, day] = dateCreated;
          formattedDate = `${month}/${day}/${year}`;
        }
        return <span>{formattedDate}</span>;
      },
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <Header
        title="Sub-Admins"
        userName={adminDetails?.firstName}
        userEmail={adminDetails?.email}
        userImage={adminDetails?.profileImage || avatar}
      />

      <div className="mt-8 flex items-center justify-between">
        <div className="flex">
          <SearchFilter onSearch={handleSearch} filter={filters} />
        </div>

        <button
          className=" mb-5 bg-[#E85C19] text-white font-bold px-3 py-2 rounded-lg 
        hover:bg-[#c74e10] transition 
        w-[120px] sm:w-[120px] md:w-[150px] lg:w-[200px] h-[80px] sm:h-[80px] md:h-[80px] lg:h-[60px]"
          onClick={handleAddSAClick}>
          Add New Sub-Admin
        </button>
      </div>
      {isAddSAModalOpen && (
        <AddSubAdmin
          isOpen={isAddSAModalOpen}
          onClose={() => setIsAddSAModalOpen(false)}
        />
      )}
      <div>
        <DataTable
          columns={SubAdminColumns}
          showFooter={true}
          data={subadmins}
          searchTerm={searchTerm}
          currentPage={currentPage}
          onPageChange={onPageChange}
          actionColumn={{
            title: "",
            render: (row) => (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    setSelectedSubadmin({
                      userId: row.id,
                      data: row,
                    })
                  );
                  navigate("/dashboard/subAdmins/sub-admin-details");
                }}
                className="text-[#e86317] text-sm hover:underline">
                View Details
              </a>
            ),
          }}
          onRowClick={(row) => console.log("Row clicked:", row)}
        />
      </div>
    </div>
  );
};

export default SubAdmin;
