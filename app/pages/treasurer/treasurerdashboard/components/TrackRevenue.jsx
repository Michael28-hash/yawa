import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDollarSign, FaRegEye } from "react-icons/fa";

const TrackRevenue = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const revenueData = [
    { id: 1, sport: "Basketball", revenue: 50000 },
    { id: 2, sport: "Volleyball", revenue: 35000 },
    { id: 3, sport: "Swimming", revenue: 20000 },
  ];

  const outstandingPayments = [
    { id: 1, name: "John Doe", amount: 5000 },
    { id: 2, name: "Jane Smith", amount: 3000 },
  ];

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

      {/* Main Header */}
      <motion.h2
        className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaDollarSign /> Track Revenue
      </motion.h2>

      {/* Summary Data Header */}
      <h3 className="text-xl font-semibold text-gray-700 mb-5">Summary Data</h3>

      {/* Summary Data Table */}
      <motion.div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto text-center border-collapse border text-gray-700">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border">Sport</th>
              <th className="p-3 border">Revenue</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((r, index) => (
              <motion.tr
                key={r.id}
                className="hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="p-3 border">{r.sport}</td>
                <td className="p-3 border font-bold">₱{r.revenue.toLocaleString()}</td>
                <td className="p-3 border">
                  <div className="flex justify-center">
                    <motion.button
                      onClick={() => setSelectedRow(r)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaRegEye /> View
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Outstanding Payments Header */}
      <h3 className="text-xl font-semibold text-gray-700 mt-5 mb-5">
        Coach with Outstanding Payments
      </h3>

      {/* Outstanding Payments Table */}
      <motion.div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto text-center border-collapse border text-gray-700">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {outstandingPayments.map((o, index) => (
              <motion.tr
                key={o.id}
                className="hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="p-3 border">{o.name}</td>
                <td className="p-3 border font-bold">₱{o.amount.toLocaleString()}</td>
                <td className="p-3 border">
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Reminder
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedRow && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              drag
              dragElastic={0.2}
              dragMomentum={false}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="bg-green-600 px-8 py-6">
                <h3 className="text-3xl font-bold text-center text-white">
                  Revenue Details
                </h3>
              </div>
              <div className="p-6 text-gray-800">
                {/* Details Table */}
                <table className="w-full table-auto border-collapse border text-gray-700">
                  <tbody>
                    <tr>
                      <td className="border p-3 font-semibold w-1/3 bg-green-600 text-white ">Sport</td>
                      <td className="border p-3">{selectedRow.sport}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white ">Revenue</td>
                      <td className="border p-3">₱{selectedRow.revenue.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end p-6 border-t border-gray-200">
                <motion.button
                  onClick={() => setSelectedRow(null)}
                  className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};  

export default TrackRevenue;
