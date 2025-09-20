import React, { useState, useEffect } from "react";
import { TbReceipt, TbCurrencyDollar } from "react-icons/tb";
import { motion } from "framer-motion";

const TrackPayments = () => {
  const [payments, setPayments] = useState([]);
  const [revenue, setRevenue] = useState({ daily: 0, weekly: 0, monthly: 0 });

  useEffect(() => {
    // Mock payment data
    setPayments([
      {
        id: "TXN1001",
        player: "John Doe",
        amount: 500,
        date: "2025-08-20",
        status: "Completed",
      },
      {
        id: "TXN1002",
        player: "Jane Smith",
        amount: 800,
        date: "2025-08-21",
        status: "Pending",
      },
      {
        id: "TXN1003",
        player: "Alex Tan",
        amount: 1200,
        date: "2025-08-22",
        status: "Canceled",
      },
    ]);

    // Mock revenue summary
    setRevenue({ daily: 1300, weekly: 2500, monthly: 8000 });
  }, []);

  const handleDownloadReceipt = (id) => {
    alert(`📄 Downloading receipt for ${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-800";
      case "Pending":
        return "text-yellow-800";
      case "Canceled":
        return "text-red-800";
      default:
        return "text-black-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl font-bold mb-6"
      >
        💰 Track Payments & Earnings
      </motion.h2>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {[
          {
            label: "Daily Revenue",
            value: revenue.daily,
            color: "bg-green-600",
          },
          {
            label: "Weekly Revenue",
            value: revenue.weekly,
            color: "bg-green-600",
          },
          {
            label: "Monthly Revenue",
            value: revenue.monthly,
            color: "bg-green-600",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.label}</p>
              <p className="text-2xl font-bold text-black">₱{item.value}</p>
            </div>
            <div className={`${item.color} text-white p-4 rounded-full`}>
              <TbCurrencyDollar className="text-2xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Status Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto"
      >
        <h3 className="text-xl font-semibold mb-4">💳 Payment History</h3>
        <table className="w-full table-auto border-collapse border border-green-200 text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Player</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 + idx * 0.2 }}
                className="hover:bg-gray-50"
              >
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border">{p.player}</td>
                <td className="p-3 border">₱{p.amount}</td>
                <td className="p-3 border">{p.date}</td>
                <td
                  className={`p-2 border rounded-full ${getStatusColor(
                    p.status
                  )}`}
                >
                  {p.status}
                </td>
                <td className="p-3 border text-center">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDownloadReceipt(p.id)}
                      className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg"
                    >
                      <TbReceipt className="mr-2" /> Download
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default TrackPayments;
