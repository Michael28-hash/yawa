import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaStar,
  FaFilePdf,
  FaFileCsv,
} from "react-icons/fa";

const Reports = () => {
  const [reportData, setReportData] = useState({
    sessions: { completed: 0, canceled: 0, pending: 0 },
    attendance: 0,
    earnings: 0,
    ratings: 0,
  });

  useEffect(() => {
    // Mock Data
    setReportData({
      sessions: { completed: 25, canceled: 5, pending: 3 },
      attendance: 85,
      earnings: 12500,
      ratings: 4.3,
    });
  }, []);

  const handleExport = (type) => {
    alert(`📂 Exporting Reports as ${type}`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        📊 Reports & Analytics
      </motion.h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Session History",
            value: (
              <div className="text-left">
                <p className="text-green-600 font-semibold">
                  Completed: {reportData.sessions.completed}
                </p>
                <p className="text-red-600 font-semibold">
                  Canceled: {reportData.sessions.canceled}
                </p>
                <p className="text-yellow-600 font-semibold">
                  Pending: {reportData.sessions.pending}
                </p>
              </div>
            ),
            icon: (
              <div className="bg-green-500 text-white p-4 rounded-full shadow">
                <FaClipboardList className="text-2xl" />
              </div>
            ),
          },

          {
            title: "Player Attendance",
            value: `${reportData.attendance}%`,
            icon: (
              <div className="bg-green-600 text-white p-4 rounded-full shadow">
                <FaUsers className="text-2xl" />
              </div>
            ),
          },
          {
            title: "Earnings",
            value: `₱${reportData.earnings.toLocaleString()}`,
            icon: (
              <div className="bg-green-600 text-white p-4 rounded-full shadow">
                <FaMoneyBillWave className="text-2xl" />
              </div>
            ),
          },
          {
            title: "Ratings Overview",
            value: `${reportData.ratings} ⭐`,
            icon: (
              <div className="bg-green-600 text-white p-4 rounded-full shadow">
                <FaStar className="text-2xl" />
              </div>
            ),
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <h2 className="text-2xl font-bold text-black">{card.value}</h2>
            </div>
            {card.icon}
          </motion.div>
        ))}
      </div>

      {/* Detailed Reports Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4">📑 Detailed Reports</h3>
        <table className="w-full table-auto border-collapse border border-gray-200 text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border">Report Type</th>
              <th className="p-3 border">Details</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-gray-700">
            <tr className="hover:bg-gray-70">
              <td className="p-3 border">Session History</td>
              <td className="p-3 border">
                Completed, Canceled, Pending Sessions
              </td>
              <td className="p-3 border text-green-700">Available</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-3 border">Player Attendance</td>
              <td className="p-3 border">Attendance % of players</td>
              <td className="p-3 border text-green-700">Available</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-3 border">Earnings Summary</td>
              <td className="p-3 border">Daily, Weekly, Monthly Revenue</td>
              <td className="p-3 border text-green-700">Available</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-3 border">Ratings Overview</td>
              <td className="p-3 border">Average ratings from players</td>
              <td className="p-3 border text-green-700">Available</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Export Buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <button
          onClick={() => handleExport("PDF")}
          className="flex items-center bg-red-600 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <FaFilePdf className="mr-2" /> Export PDF
        </button>
        <button
          onClick={() => handleExport("CSV")}
          className="flex items-center bg-green-600 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <FaFileCsv className="mr-2" /> Export CSV
        </button>
      </motion.div>
    </div>
  );
};

export default Reports;
