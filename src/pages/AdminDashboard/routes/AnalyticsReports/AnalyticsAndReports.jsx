import React from "react";
import { AnalyticsChart } from "../../../../shared/Chart/analytics-chart";
import { StatCard } from "../../../../shared/Stat-Card/stat-card";

const AnalyticsAndReports = () => {
  const statsData = [
    { title: "Total No. of Users", value: "2,105" },
    { title: "Total No. of Orders", value: "7,302" },
    { title: "Total No. of Service Partners", value: "238" },
    { title: "Total No. of Delivery Agents", value: "1,032" },
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
    users: {
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
    { id: "users", label: "New Users Registration" },
    { id: "profile", label: "Profile Updates" },
    { id: "orders", label: "Order Placements" },
  ];

  const analyticsYaxis = [100, 75, 50, 25, 0];
  const userRetentionData = {
    userRetention: {
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
    },
  };
  const retentionYaxis = ["125", "100", "75", "50", "25"];
  const userRetentionTab = [{ id: "userRetention", label: "User Retention" }];

  const reportData = {
    placed: {
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
    completed: {
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

    cancelled: {
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
  };

  const reportTabs = [
    { id: "placed", label: "Order Placed" },
    { id: "completed", label: "Completed Orders" },
    { id: "cancelled", label: "Cancelled Orders" },
  ];
  const reportYaxis = ["150", "125", "100", "75", "50", "25"];
  return (
    <div>
      AnalyticsAndReports
      {/* StatISTICs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
      {/* analytics */}
      <AnalyticsChart
        title="Analytics"
        tabs={analyticsTabs}
        defaultTab="login"
        data={analyticsData}
        onPeriodChange={(period) => console.log("Period changed:", period)}
        yAxis={analyticsYaxis}
        type="bar"
      />
      {/* user retention data */}
      <div className="mt-22">
        <AnalyticsChart
          title="User Retention Data"
          tabs={userRetentionTab}
          defaultTab="userRetention"
          data={userRetentionData}
          onPeriodChange={(period) => console.log("Period changed:", period)}
          yAxis={retentionYaxis}
          type="line"
        />
      </div>
      {/* order report */}
      <div className="mt-22">
        <AnalyticsChart
          title="Order Report"
          tabs={reportTabs}
          defaultTab="placed"
          data={reportData}
          onPeriodChange={(period) => console.log("Period changed:", period)}
          yAxis={reportYaxis}
          type="bar"
        />
      </div>
    </div>
  );
};

export default AnalyticsAndReports;
