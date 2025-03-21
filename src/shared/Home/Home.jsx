import { StatCard } from "../Stat-Card/stat-card.jsx";
import { DataTable } from "../Table/data-table.jsx";
import { StatusBadge } from "../Status-Badge/status-badge.jsx";
import { AnalyticsChart } from "../Chart/analytics-chart.jsx";
import { SectionHeader } from "../Section-Header/section-header.jsx";

export default function Home() {
  // DUMMY data for the dashboard
  const statsData = [
    { title: "Total No. of Users", value: "2,105" },
    { title: "Total No. of Orders", value: "7,302" },
    { title: "Total No. of Service Partners", value: "238" },
    { title: "Total No. of Delivery Agents", value: "1,032" },
  ];

  const ordersData = [
    {
      id: "0081727",
      customer: "Chinedu Okafor",
      email: "olivia@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "NEW",
      orderStatusVariant: "new",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Amina Bello",
      email: "phoenix@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "SUCCESSFUL",
      orderStatusVariant: "success",
      paymentStatus: "PROCESSING",
      paymentStatusVariant: "processing",
    },
    {
      id: "0081727",
      customer: "Emeka Nwosu",
      email: "lana@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "IN PROGRESS",
      orderStatusVariant: "progress",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Fatima Abubakar",
      email: "demi@untitledui.com",
      serviceType: "Quick Pickup",
      orderStatus: "COMPLETED",
      orderStatusVariant: "completed",
      paymentStatus: "PENDING",
      paymentStatusVariant: "pending",
    },
    {
      id: "0081727",
      customer: "Tunde Adeyemi",
      email: "candice@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "IN PROGRESS",
      orderStatusVariant: "progress",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Ngozi Ibe",
      email: "natali@untitledui.com",
      serviceType: "Quick Pickup",
      orderStatus: "CANCELLED",
      orderStatusVariant: "cancelled",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Ifeoma Uche",
      email: "drew@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "COMPLETED",
      orderStatusVariant: "completed",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Kelechi Eze",
      email: "orlando@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "COMPLETED",
      orderStatusVariant: "completed",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Zainab Ibrahim",
      email: "andi@untitledui.com",
      serviceType: "Quick Pickup",
      orderStatus: "SUCCESSFUL",
      orderStatusVariant: "success",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
    {
      id: "0081727",
      customer: "Chijioke Obi",
      email: "kate@untitledui.com",
      serviceType: "Normal/Express",
      orderStatus: "COMPLETED",
      orderStatusVariant: "completed",
      paymentStatus: "PAID",
      paymentStatusVariant: "paid",
    },
  ];

  const orderColumns = [
    { key: "id", title: "Order ID" },
    { key: "customer", title: "Customer Name" },
    { key: "email", title: "Email address" },
    { key: "serviceType", title: "Service Type" },
    {
      key: "orderStatus",
      title: "Order Status",
      render: (value, row) => (
        <StatusBadge status={value} variant={row.orderStatusVariant} />
      ),
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      render: (value, row) => (
        <StatusBadge status={value} variant={row.paymentStatusVariant} />
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
    <div className="container mx-auto py-6 px-4">
      {/* StatISTICs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <SectionHeader
          title="Recent Orders"
          actionLink={{ text: "See All", href: "#" }}
        />
        <DataTable
          columns={orderColumns}
          // showFooter={true}
          showFooter={false}
          data={ordersData}
          actionColumn={{
            title: "",
            render: (row) => (
              <a href="#" className="text-[#e86317] text-sm hover:underline">
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
    </div>
  );
}
