import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ProcessCoachPayouts = () => {
  const [payouts, setPayouts] = useState([
    { id: 1, coach: "John Doe", amount: 5000, status: "Pending" },
    { id: 2, coach: "Jane Smith", amount: 7500, status: "Pending" },
    { id: 3, coach: "Mark Santos", amount: 6200, status: "Paid" },
  ]);

  const handlePayout = (id) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Paid" } : p))
    );
    alert("✅ Coach has been notified of successful payout!");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05 },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="p-6 space-y-8">
      {/* Header */}
      <motion.h2
        className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaDollarSign /> Process Coach Payouts
      </motion.h2>

      {/* Table container */}
      <motion.div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Coach</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment Channel</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, index) => (
              <motion.tr
                key={payout.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{payout.coach}</td>
                <td className="p-3">₱{payout.amount.toLocaleString()}</td>
                <td className="p-3">
                  <select
                    className="border rounded-lg px-3 py-1 text-sm w-full"
                    defaultValue="Bank"
                  >
                    <option>Bank</option>
                    <option>GCash</option>
                    <option>Cash</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      payout.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {payout.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {payout.status === "Pending" ? (
                    <Button
                      onClick={() => handlePayout(payout.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg"
                    >
                      Pay Now
                    </Button>
                  ) : (
                    <span className="text-gray-500 font-semibold">✔ Paid</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ProcessCoachPayouts;
