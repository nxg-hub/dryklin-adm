import React, { useEffect, useState } from "react";
import { StatusBadge } from "../../../../shared/Status-Badge/status-badge";
import { DataTable } from "../../../../shared/Table/data-table";
// import { MdOutlineMenuBook } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "../../../../shared/Searchbar/SearchFilter";
import { fetchOrders } from "../../../../redux/OrderMangementSlice";
import Header from "../../../../shared/Section-Header/header.jsx";
import { setSelectedOrder } from "../../../../redux/OrderSlice.jsx";
import { useNavigate } from "react-router-dom";
import avatar from "../../../../assets/avatar.png";

const OrderManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState("id"); // Default filter
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderManagement.orders);
  const loading = useSelector((state) => state.orderManagement.loading);
  const error = useSelector((state) => state.orderManagement.error);
  const success = useSelector((state) => state.orderManagement.success);
  const adminDetails = useSelector((state) => state.admin.adminDetails);

  const sortedOrders = orders.slice().reverse();

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // List of filters
  const filters = [
    { label: "Select", value: "" },
    { label: "Customer", value: "customerName" },
    { label: "ID", value: "id" },
    { label: "Payment Status", value: "paymentStatus" },
    { label: "Order Status", value: "orderStatus" },
  ];

  // Handle search and filter changes
  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setFilterBy(filter);
  };
  useEffect(() => {
    if (success) {
      return;
    } else {
      dispatch(fetchOrders());
    }
  }, []);

  const orderColumns = [
    { key: "id", title: "Order ID" },
    { key: "customerName", title: "Customer Name" },
    { key: "customerEmail", title: "Email address" },
    { key: "serviceType", title: "Service Type" },
    {
      key: "orderStatus",
      title: "Order Status",
      render: (value, row) => (
        <StatusBadge status={value} variant={row.orderStatus} />
      ),
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      render: (value, row) => (
        <StatusBadge status={value} variant={row.paymentStatus} />
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-11 flex items-center ">
        <Header
          title=" Order Management"
          userName={adminDetails?.firstName}
          userEmail={adminDetails?.email}
          userImage={adminDetails?.profileImage || avatar}
        />
        {/* <span className="flex items-center ml-2.5 gap-2 font-light text-white text-[16px] px-3 py-2 rounded-full bg-[#F32749]  ">
          <MdOutlineMenuBook size={16} />
          {ordersData.length}
        </span> */}
      </h2>

      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : !loading && error ? (
        <h2 className="text-center">Something went wrong</h2>
      ) : (
        <>
          {/* Search & Filter Component */}
          <SearchFilter onSearch={handleSearch} filters={filters} />
          <div>
            <DataTable
              columns={orderColumns}
              filterBy={filterBy}
              showFooter={true}
              data={sortedOrders}
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
                      dispatch(setSelectedOrder(row)); // Store in Redux
                      navigate("/dashboard/orderManagement/orderDetails"); // Navigate to details page
                    }}
                    className="text-[#e86317] text-sm hover:underline">
                    View Details
                  </a>
                ),
              }}
              onRowClick={(row) => console.log("Row clicked:", row)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderManagement;
