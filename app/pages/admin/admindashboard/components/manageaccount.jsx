import React, { useState } from "react";
import { motion } from "framer-motion";

const ManageAccount = () => {
  const [activeTab, setActiveTab] = useState("coach");
  const [sportFilter, setSportFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rates, setRates] = useState([
    {
      id: 1,
      coach: "John Doe",
      sport: "Basketball",
      rate: 500,
      status: "Active",
      updated: "2025-08-20",
      profile: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      coach: "Jane Smith",
      sport: "Volleyball",
      rate: 600,
      status: "Inactive",
      updated: "2025-08-18",
      profile: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      coach: "Mark Reyes",
      sport: "Basketball",
      rate: 450,
      status: "Active",
      updated: "2025-08-15",
      profile: "https://via.placeholder.com/100",
    },
  ]);

  const [viewingCoach, setViewingCoach] = useState(null);

  const filteredRates = rates.filter(
    (r) =>
      (sportFilter === "All" || r.sport === sportFilter) &&
      (statusFilter === "All" || r.status === statusFilter)
  );

  return (
    <motion.div className="w-full min-h-screen bg-gray-100 p-6">
      {/* White Card Container */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <motion.h2
          className="text-3xl font-extrabold flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          👥 Manage Account
        </motion.h2>

        {/* Toggle Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("coach")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "coach"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Coaches
          </button>
          <button
            onClick={() => setActiveTab("player")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === "player"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Players
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            <option value="All">All Sports</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto shadow-lg rounded-2xl bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4 border">Coach Name</th>
                <th className="p-4 border">Sport</th>
                <th className="p-4 border">Rate (₱)</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Last Update</th>
                <th className="p-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.length > 0 ? (
                filteredRates.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-green-50 transition cursor-pointer"
                  >
                    <td className="p-4 border">{r.coach}</td>
                    <td className="p-4 border">{r.sport}</td>
                    <td className="p-4 border">₱ {r.rate}</td>
                    <td
                      className={`p-4 border font-semibold ${
                        r.status === "Active" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {r.status}
                    </td>
                    <td className="p-5 border">{r.updated}</td>
                    <td className="p-5 border">
                      <button
                        onClick={() => setViewingCoach(r)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 border text-center" colSpan={6}>
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* View Details Modal */}
        {viewingCoach && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              drag
              dragElastic={0.2}
              dragMomentum={false}
              className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="bg-green-600 text-white px-10 py-4 rounded-t-2xl text-center font-semibold text-lg cursor-grab">
                Coach Details
              </div>

              {/* Body - Details Table */}
              <div className="p-6">
                <table className="w-full table-auto border-collapse border text-gray-700">
                  <tbody>
                    <tr>
                      <td className="border p-3 font-semibold w-1/3 bg-green-600 text-white">Coach Name</td>
                      <td className="border p-3">{viewingCoach.coach}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Sport</td>
                      <td className="border p-3">{viewingCoach.sport}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Rate (₱)</td>
                      <td className="border p-3">₱ {viewingCoach.rate}</td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Status</td>
                      <td className={`border p-3 font-semibold ${viewingCoach.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                        {viewingCoach.status}
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-semibold bg-green-600 text-white">Last Update</td>
                      <td className="border p-3">{viewingCoach.updated}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t">
                <button
                  onClick={() => setViewingCoach(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageAccount;
