import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbZoom, TbDownload } from "react-icons/tb";
import CryptoJS from "crypto-js";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ActivityManagement = () => {
  const SECRET_KEY = "my_secret_key_123456";
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const encryptedUserId = sessionStorage.getItem("user_id");
    if (encryptedUserId) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, SECRET_KEY);
        const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
        setLoggedInUserId(decryptedUserId);
      } catch (error) {
        console.error("Error decrypting user ID:", error);
      }
    }
  }, []);

  const filteredLogs = logs
    .filter(
      (log) =>
        log.username.toLowerCase().includes(searchText.toLowerCase()) &&
        (roleFilter === "All" || log.role === roleFilter) &&
        (statusFilter === "All" || log.status === statusFilter)
    )
    .sort((a, b) => b.log_id - a.log_id);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const goToPage = (page) => setCurrentPage(page);

  const handleExport = () => toast.success("Export functionality coming soon!");

  return (
    <motion.div
      className="w-full min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* White Card Container */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <motion.h2
          className="text-3xl font-extrabold flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📊 Activity Logs
        </motion.h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by username, action..."
              className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
            <TbZoom className="absolute right-3 top-2.5 text-gray-500 h-5 w-5" />
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Coach">Coach</option>
              <option value="Player">Player</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Failure">Failure</option>
            </select>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <TbDownload /> Export
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto rounded-2xl shadow bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border px-4 py-2 text-center">#</th>
                <th className="border px-4 py-2 text-center">Username</th>
                <th className="border px-4 py-2 text-center">Role</th>
                <th className="border px-4 py-2 text-center">Action</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-center">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((log) => (
                  <tr
                    key={log.log_id}
                    className="cursor-pointer hover:bg-green-50 transition"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="border px-4 py-2 text-center">{log.log_id}</td>
                    <td className="border px-4 py-2 text-center">{log.username}</td>
                    <td className="border px-4 py-2 text-center">{log.role}</td>
                    <td className="border px-4 py-2 text-center">{log.action}</td>
                    <td
                      className={`border px-4 py-2 text-center font-semibold ${
                        log.status === "Success" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {log.status}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {new Date(log.activity_time).toLocaleString("en-PH", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-700">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredLogs.length)} of {filteredLogs.length} entries
          </span>
          <Pagination>
            <PaginationContent className="flex">
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    onClick={() => goToPage(idx + 1)}
                    className={currentPage === idx + 1 ? "bg-red-900 text-white" : ""}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Log Details Modal */}
        {selectedLog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 shadow-lg overflow-y-auto max-h-[80vh]">
              <h2 className="text-xl font-bold mb-4">Log Details</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Username:</strong> {selectedLog.username}
                </li>
                <li>
                  <strong>Role:</strong> {selectedLog.role}
                </li>
                <li>
                  <strong>Action:</strong> {selectedLog.action}
                </li>
                <li>
                  <strong>Status:</strong> {selectedLog.status}
                </li>
                <li>
                  <strong>Date & Time:</strong>{" "}
                  {new Date(selectedLog.activity_time).toLocaleString()}
                </li>
                <li>
                  <strong>IP / Device:</strong> {selectedLog.device_info || "N/A"}
                </li>
                <li>
                  <strong>Before / After Values:</strong>{" "}
                  {selectedLog.before_after || "N/A"}
                </li>
                <li>
                  <strong>Related ID:</strong> {selectedLog.related_id || "N/A"}
                </li>
              </ul>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => setSelectedLog(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
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

export default ActivityManagement;
