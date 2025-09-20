import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbDownload, TbFileSpreadsheet, TbReceipt, TbChartBar } from "react-icons/tb";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const TrackHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    // Mock data
    setBookings([
      { id: 1, coach: "Coach Mark", date: "2025-08-10", status: "Completed" },
      { id: 2, coach: "Coach Ana", date: "2025-08-12", status: "Cancelled" },
    ]);
    setPayments([
      { id: "TXN12345", amount: "₱1200", date: "2025-08-10" },
      { id: "TXN12346", amount: "₱800", date: "2025-08-12" },
    ]);
    setPerformance([
      { month: "Jan", sessions: 5, rating: 4.2 },
      { month: "Feb", sessions: 8, rating: 4.5 },
      { month: "Mar", sessions: 6, rating: 4.8 },
    ]);
  }, []);

  const handleExport = (type) => {
    alert(`📂 Exporting data as ${type}`);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      className="w-full min-h-screen bg-gray-50 p-6"
    >
      <motion.h2
        variants={sectionVariants}
        className="text-3xl font-bold mb-6"
      >
        📊 Track History & Performance
      </motion.h2>

      {/* Booking History */}
      <motion.div
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6 w-full overflow-x-auto"
      >
        <h3 className="text-xl font-semibold mb-4">📅 Booking History</h3>
        <table className="w-full table-auto border-collapse border border-gray-200 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Coach</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-3 border">{b.coach}</td>
                <td className="p-3 border">{b.date}</td>
                <td className="p-3 border">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Payment History */}
      <motion.div
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6 w-full overflow-x-auto"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <TbReceipt className="mr-2" /> Payment History
        </h3>
        <ul className="space-y-3">
          {payments.map((p) => (
            <li key={p.id} className="flex justify-between p-3 border rounded-lg bg-gray-50">
              <span>{p.id}</span>
              <span>{p.amount}</span>
              <span>{p.date}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        variants={sectionVariants}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6 w-full"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <TbChartBar className="mr-2" /> Performance Evaluation
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sessions" stroke="#82ca9d" name="Sessions" />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" name="Avg. Rating" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Export Options */}
      <motion.div
        variants={sectionVariants}
        className="flex gap-4"
      >
        <button
          onClick={() => handleExport("PDF")}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <TbDownload className="mr-2" /> Export PDF
        </button>
        <button
          onClick={() => handleExport("CSV")}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <TbFileSpreadsheet className="mr-2" /> Export CSV
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TrackHistory;
