import React, { useEffect } from "react";
import { AnalyticsChart } from "../../../../shared/Chart/analytics-chart";
import { StatCard } from "../../../../shared/Stat-Card/stat-card";
import Header from "../../../../shared/Section-Header/header.jsx";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../../../assets/avatar.png";
import {
  fetchMonthlyCancelledOrders,
  fetchMonthlyCompletedOrders,
  fetchMonthlyLogin,
  fetchMonthlyNewUsers,
  fetchMonthlyOrders,
  fetchProfileUpdate,
} from "../../../../redux/AnalyticsSlice.jsx";

const AnalyticsAndReports = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderManagement.orders);
  const {
    monthlyOrders,
    monthlyLogin,
    profileUpdate,
    completedOrders,
    cancelledOrders,
    newUsers,
    loading,
    error,
  } = useSelector((state) => state.analytics);
  const { users, servicePartners, agents } = useSelector((state) => state.user);
  const adminDetails = useSelector((state) => state.admin.adminDetails);

  useEffect(() => {
    dispatch(fetchMonthlyOrders());
    dispatch(fetchProfileUpdate());
    dispatch(fetchMonthlyLogin());
    dispatch(fetchMonthlyCompletedOrders());
    dispatch(fetchMonthlyCancelledOrders());
    dispatch(fetchMonthlyNewUsers());
  }, []);
  const statsData = [
    {
      title: "Total No. of Users",
      value: users.length,
      link: "/dashboard/users",
    },
    {
      title: "Total No. of Orders",
      value: orders.length,
      link: "/dashboard/orderManagement",
    },
    {
      title: "Total No. of Service Partners",
      value: servicePartners.length,
      link: "/dashboard/users",
    },
    {
      title: "Total No. of Delivery Agents",
      value: agents.length,
      link: "/dashboard/users",
    },
  ];
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Map full month names to short labels
  const fullToShortMap = {
    JANUARY: "Jan",
    FEBRUARY: "Feb",
    MARCH: "Mar",
    APRIL: "Apr",
    MAY: "May",
    JUNE: "Jun",
    JULY: "Jul",
    AUGUST: "Aug",
    SEPTEMBER: "Sep",
    OCTOBER: "Oct",
    NOVEMBER: "Nov",
    DECEMBER: "Dec",
  };

  //reusable function to update the analytics section
  function updateAnalyticsSection(sectionName, backendData) {
    const formattedData = {};

    for (const [month, value] of Object.entries(backendData)) {
      const upper = month.toUpperCase();
      const short = fullToShortMap[upper];
      if (short) {
        formattedData[short] = value;
      }
    }

    const values = allMonths.map((month) => formattedData[month] || 0);
    const subLabels = values.map((val) => val.toString());

    analyticsData[sectionName].labels = allMonths;
    analyticsData[sectionName].values = values;
    analyticsData[sectionName].subLabels = subLabels;
  }

  const analyticsData = {
    login: {
      labels: allMonths,
      values: [],
    },
    users: {
      labels: allMonths,
      values: [],
    },

    profile: {
      labels: allMonths,
      values: [],
    },
    orders: {
      labels: allMonths,
      values: [],
    },
  };
  updateAnalyticsSection("orders", monthlyOrders);
  updateAnalyticsSection("profile", profileUpdate);
  updateAnalyticsSection("login", monthlyLogin);
  updateAnalyticsSection("users", newUsers);

  const analyticsTabs = [
    { id: "login", label: "Login Frequency" },
    { id: "users", label: "New Users Registration" },
    { id: "profile", label: "Profile Updates" },
    { id: "orders", label: "Order Placements" },
  ];

  const analyticsYaxis = [100, 75, 50, 25, 0];
  const userRetentionData = {
    userRetention: {
      labels: allMonths,
      values: [100, 50, 70, 50, 70, 50, 70, 50, 70, 50],
    },
  };
  const retentionYaxis = ["125", "100", "75", "50", "25"];
  const userRetentionTab = [{ id: "userRetention", label: "User Retention" }];

  //reusable function to update the report section
  function updateReportSection(sectionName, backendData) {
    const formattedData = {};

    for (const [month, value] of Object.entries(backendData)) {
      const upper = month.toUpperCase();
      const short = fullToShortMap[upper];
      if (short) {
        formattedData[short] = value;
      }
    }

    const values = allMonths.map((month) => formattedData[month] || 0);
    const subLabels = values.map((val) => val.toString());

    reportData[sectionName].labels = allMonths;
    reportData[sectionName].values = values;
    reportData[sectionName].subLabels = subLabels;
  }

  const reportData = {
    placed: {
      labels: allMonths,
      values: [],
    },
    completed: {
      labels: allMonths,
      values: [],
    },

    cancelled: {
      labels: allMonths,
      values: [],
    },
  };
  updateReportSection("placed", monthlyOrders);
  updateReportSection("completed", completedOrders);
  updateReportSection("cancelled", cancelledOrders);
  const reportTabs = [
    { id: "placed", label: "Order Placed" },
    { id: "completed", label: "Completed Orders" },
    { id: "cancelled", label: "Cancelled Orders" },
  ];
  const reportYaxis = ["150", "125", "100", "75", "50", "25"];
  return (
    <div>
      <Header
        title=" Analytics And Reports"
        userName={adminDetails?.firstName}
        userEmail={adminDetails?.email}
        userImage={adminDetails?.profileImage || avatar}
      />
      {/* StatISTICs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            linkHref={stat.link}
          />
        ))}
      </div>
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : !loading && error ? (
        <h2 className="text-center">
          Something went wrong, check internet connection.
        </h2>
      ) : (
        <>
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
              onPeriodChange={(period) =>
                console.log("Period changed:", period)
              }
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
              onPeriodChange={(period) =>
                console.log("Period changed:", period)
              }
              yAxis={reportYaxis}
              type="bar"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsAndReports;
