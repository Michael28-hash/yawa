import { TbZoom, TbCheck, TbX } from "react-icons/tb";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, { useState } from "react";

const dummyApplications = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "09123456789",
    specialization: "Basketball",
    rate: 500,
    certifications: "Level 1 Coach",
    status: "Pending",
    submitted_at: "2025-08-23",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "09234567890",
    specialization: "Swimming",
    rate: 700,
    certifications: "Level 2 Coach",
    status: "Approved",
    submitted_at: "2025-07-15",
  },
];

const ViewApplyCoachManagement = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchText, setSearchText] = useState("");

  const filteredApps = dummyApplications.filter(
    (app) =>
      app.status === activeTab &&
      (app.name.toLowerCase().includes(searchText.toLowerCase()) ||
        app.email.toLowerCase().includes(searchText.toLowerCase()) ||
        app.specialization.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleApprove = (id) => toast.success(`Application #${id} approved`);
  const handleReject = (id) => toast.error(`Application #${id} rejected`);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      {/* White Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <motion.h2
          className="text-3xl font-extrabold flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📝 Coach Applications
        </motion.h2>

        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 mb-2 md:mb-0">
            {["Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-semibold rounded-lg border transition ${
                  activeTab === tab
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-gray-100 text-gray-700 border-gray-100 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white shadow rounded-lg px-4 py-2 w-full lg:w-1/3">
            <TbZoom className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name, email, or sport..."
              className="w-full outline-none text-gray-700"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Applications Table */}
        <motion.div className="overflow-x-auto rounded-2xl shadow bg-white">
          <table className="w-full table-auto text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Phone</th>
                <th className="px-4 py-3 border">Specialization</th>
                <th className="px-4 py-3 border">Rate (₱)</th>
                <th className="px-4 py-3 border">Submitted At</th>
                {activeTab === "Pending" && (
                  <th className="px-4 py-3 border">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-green-50 transition cursor-pointer"
                  >
                    <td className="px-4 py-3 border">{app.name}</td>
                    <td className="px-4 py-3 border">{app.email}</td>
                    <td className="px-4 py-3 border">{app.phone}</td>
                    <td className="px-4 py-3 border">{app.specialization}</td>
                    <td className="px-4 py-3 border">₱{app.rate}</td>
                    <td className="px-4 py-3 border">{app.submitted_at}</td>
                    {activeTab === "Pending" && (
                      <td className="px-4 py-3 border flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1 transition"
                        >
                          <TbCheck /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 transition"
                        >
                          <TbX /> Reject
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={activeTab === "Pending" ? 7 : 6}
                    className="py-6 text-center text-gray-500"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </motion.div>
  );
};

export default ViewApplyCoachManagement;
