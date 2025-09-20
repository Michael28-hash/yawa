import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbChartBar, TbFileExport, TbFilter, TbFileText } from "react-icons/tb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState("Bookings Report");

  // Mock Data
  const bookingsData = [
    { name: "Basketball", bookings: 120 },
    { name: "Volleyball", bookings: 90 },
    { name: "Tennis", bookings: 70 },
  ];

  const paymentsData = [
    { name: "Paid", value: 300 },
    { name: "Pending", value: 80 },
    { name: "Canceled", value: 40 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 2000 },
    { month: "Feb", revenue: 2500 },
    { month: "Mar", revenue: 3200 },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <motion.h2
        className="text-3xl font-extrabold mb-8 flex items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📑 Admin Reports
      </motion.h2>

      {/* Report Selector */}
      <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
        {[
          "Bookings Report",
          "Payment & Revenue Report",
          "Coach Performance Report",
          "Player Activity Report",
          "System Usage Report",
        ].map((report) => (
          <button
            key={report}
            onClick={() => setSelectedReport(report)}
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${
              selectedReport === report
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {report}
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center"
      >
        <TbFilter className="text-xl text-gray-600" />
        <select className="border rounded-lg px-3 py-2">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
          <option>Custom Range</option>
        </select>
        <select className="border rounded-lg px-3 py-2">
          <option>All Sports</option>
          <option>Basketball</option>
          <option>Volleyball</option>
          <option>Tennis</option>
        </select>
        <select className="border rounded-lg px-3 py-2">
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Canceled</option>
        </select>
      </motion.div>

      {/* Report Content */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">{selectedReport}</h3>

        {selectedReport === "Bookings Report" && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {selectedReport === "Payment & Revenue Report" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {paymentsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedReport === "Coach Performance Report" && (
          <p>
            📊 Show sessions conducted, ratings, and earnings per coach here.
          </p>
        )}

        {selectedReport === "Player Activity Report" && (
          <p>📊 Show player bookings, attendance, and payment history here.</p>
        )}

        {selectedReport === "System Usage Report" && (
          <p>
            📊 Show active users, peak booking times, cancellations & trends
            here.
          </p>
        )}
      </motion.div>

      {/* Export Options */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          <TbFileExport className="mr-2" /> Export PDF
        </button>
        <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
          <TbFileText className="mr-2" /> Export CSV
        </button>
      </motion.div>
    </div>
  );
};

export default AdminReports;
