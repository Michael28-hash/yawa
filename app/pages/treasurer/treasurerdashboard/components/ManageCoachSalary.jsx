import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaRegEye,
  FaMoneyCheck,
  FaDollarSign,
  FaUserFriends,
} from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyCoaches = [
  {
    id: 1,
    name: "John Doe",
    sport: "Basketball",
    sessions: 10,
    rate: 500,
    commission: 500,
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    sport: "Volleyball",
    sessions: 8,
    rate: 450,
    commission: 360,
    status: "Paid",
  },
  {
    id: 3,
    name: "Mark Lee",
    sport: "Swimming",
    sessions: 12,
    rate: 600,
    commission: 720,
    status: "Pending",
  },
];

const ManageCoachSalaries = () => {
  const [coaches, setCoaches] = useState(dummyCoaches);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null);

  const filteredCoaches = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcessPayment = (id) => {
    setCoaches((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Paid" } : c))
    );
    toast.success("Salary successfully processed!");
  };

  const handleViewDetails = (coach) => {
    setSelectedCoach(coach);
  };

  const closeModal = () => {
    setSelectedCoach(null);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="p-6"
    >
      {/* Header */}
      <motion.h2
        className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        💰 Manage Coach Salaries
      </motion.h2>

      {/* Quick Stats */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <p className="text-sm text-gray-600">Total Coaches</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {coaches.length}
            </h2>
          </div>
          <div className="bg-blue-600 text-white p-3 rounded-full">
            <FaUserFriends className="text-xl" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <p className="text-sm text-gray-600">Total Payout This Month</p>
            <h2 className="text-2xl font-bold text-gray-800">
              ₱
              {coaches
                .reduce((sum, c) => sum + c.sessions * c.rate - c.commission, 0)
                .toLocaleString()}
            </h2>
          </div>
          <div className="bg-green-600 text-white p-3 rounded-full">
            <FaDollarSign className="text-xl" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <p className="text-sm text-gray-600">Pending Salaries</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {coaches.filter((c) => c.status === "Pending").length}
            </h2>
          </div>
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaMoneyCheck className="text-xl" />
          </div>
        </motion.div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 border rounded-lg px-3 py-1 w-full md:w-1/3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by coach or sport"
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Main Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto border-collapse border text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border">Coach Name</th>
              <th className="p-3 border">Sport</th>
              <th className="p-3 border">Sessions Completed</th>
              <th className="p-3 border">Rate / Session</th>
              <th className="p-3 border">Total Earnings</th>
              <th className="p-3 border">Commission</th>
              <th className="p-3 border">Final Payout</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="font-semibold text-gray-700">
            {filteredCoaches.map((coach, index) => {
              const totalEarnings = coach.sessions * coach.rate;
              const finalPayout = totalEarnings - coach.commission;

              return (
                <motion.tr
                  key={coach.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="p-3 border">{coach.name}</td>
                  <td className="p-3 border">{coach.sport}</td>
                  <td className="p-3 border">{coach.sessions}</td>
                  <td className="p-3 border">₱{coach.rate}</td>
                  <td className="p-3 border">
                    ₱{totalEarnings.toLocaleString()}
                  </td>
                  <td className="p-3 border">
                    ₱{coach.commission.toLocaleString()}
                  </td>
                  <td className="p-3 border">
                    ₱{finalPayout.toLocaleString()}
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        coach.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                    >
                      {coach.status}
                    </span>
                  </td>
                  <td className="p-3 border flex justify-center gap-2">
                    {coach.status === "Pending" && (
                      <motion.button
                        onClick={() => handleProcessPayment(coach.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaMoneyCheck /> Process Payment
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => handleViewDetails(coach)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaRegEye /> View Details
                    </motion.button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedCoach && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              drag
              dragElastic={0.2}
              dragMomentum={false}
              className="bg-white rounded-xl w-full max-w-3xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Green Header */}
              <div className="bg-green-600 px-5 py-4">
                <h3 className="text-3xl font-bold text-center text-white">
                  Coach Salary Details
                </h3>
              </div>

              {/* Table for details */}
              <div className="p-6 overflow-x-auto">
                <table className="w-full table-auto border border-gray-200 text-left">
                  <tbody className="text-gray-800">
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white w-1/3">
                        Name
                      </td>
                      <td className="p-4">{selectedCoach.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white ">Sport</td>
                      <td className="p-4">{selectedCoach.sport}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white ">
                        Sessions
                      </td>
                      <td className="p-4">{selectedCoach.sessions}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white">
                        Rate per Session
                      </td>
                      <td className="p-4">
                        ₱{selectedCoach.rate.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white">
                        Total Earnings
                      </td>
                      <td className="p-4">
                        ₱
                        {(
                          selectedCoach.sessions * selectedCoach.rate
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white">
                        Commission
                      </td>
                      <td className="p-4">
                        ₱{selectedCoach.commission.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold bg-green-600 text-white ">
                        Final Payout
                      </td>
                      <td className="p-4">
                        ₱
                        {(
                          selectedCoach.sessions * selectedCoach.rate -
                          selectedCoach.commission
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold bg-green-600 text-white">Status</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            selectedCoach.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-green-600"
                          }`}
                        >
                          {selectedCoach.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Close Button */}
              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </motion.div>
  );
};

export default ManageCoachSalaries;
