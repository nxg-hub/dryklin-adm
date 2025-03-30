import { StatCard } from "../Stat-Card/stat-card.jsx";
import { DataTable } from "../Table/data-table.jsx";
import { StatusBadge } from "../Status-Badge/status-badge.jsx";
import { AnalyticsChart } from "../Chart/analytics-chart.jsx";
import { SectionHeader } from "../Section-Header/section-header.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/OrderMangementSlice.jsx";
import Header from "../Section-Header/header.jsx";
import { setSelectedOrder } from "../../redux/OrderSlice.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderManagement.orders);
  const loading = useSelector((state) => state.orderManagement.loading);
  const error = useSelector((state) => state.orderManagement.error);
  const success = useSelector((state) => state.orderManagement.success);
  const sortedOrders = [...orders].reverse().slice(0, 10);

  useEffect(() => {
    if (success) {
      return;
    }
    dispatch(fetchOrders());
  }, []);

  const statsData = [
    { title: "Total No. of Users", value: "2,105" },
    { title: "Total No. of Orders", value: orders.length },
    { title: "Total No. of Service Partners", value: "238" },
    { title: "Total No. of Delivery Agents", value: "1,032" },
  ];

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

  const analyticsData = {
    login: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Aug",
      ],
      values: [100, 50, 70, 50, 70, 50, 70, 50, 70, 50],
      subLabels: ["78", "78", "78", "78", "78", "78", "78", "78", "78", "78"],
    },
    profile: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Aug",
      ],
      values: [80, 60, 90, 40, 60, 70, 50, 60, 80, 40],
      subLabels: ["78", "78", "78", "78", "78", "78", "78", "78", "78", "78"],
    },
    orders: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Aug",
      ],
      values: [60, 80, 50, 70, 90, 60, 80, 70, 50, 60],
      subLabels: ["78", "78", "78", "78", "78", "78", "78", "78", "78", "78"],
    },
  };

  const analyticsTabs = [
    { id: "login", label: "Login Frequency" },
    { id: "profile", label: "Profile Updates" },
    { id: "orders", label: "Order Placements" },
  ];
  const yAxis = [100, 75, 50, 25, 0];
  return (
    <div className="container mx-auto py-2 px-4">
      <Header
        title="My Account"
        userName="{user.name}"
        userEmail="{user.email}"
        userImage="{user.profileImage}"
      />

      {/* Recent Orders */}
      {loading ? (
        <h2 className="text-center mt-4">Loading...</h2>
      ) : !loading && error ? (
        <h2 className="text-center mt-4">
          Something went wrong, check internet connection
        </h2>
      ) : (
        <>
          {/* StatISTICs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
            {statsData.map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
          <div className="mb-8">
            <SectionHeader
              title="Recent Orders"
              actionLink={{ text: "See All", href: "#" }}
            />
            <DataTable
              columns={orderColumns}
              // showFooter={true}
              searchTerm={searchTerm}
              showFooter={false}
              data={sortedOrders}
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

          {/* Analytics */}
          <AnalyticsChart
            title="Analytics"
            tabs={analyticsTabs}
            defaultTab="login"
            data={analyticsData}
            onPeriodChange={(period) => console.log("Period changed:", period)}
            yAxis={yAxis}
            type="bar"
          />
        </>
      )}
    </div>
  );
}
