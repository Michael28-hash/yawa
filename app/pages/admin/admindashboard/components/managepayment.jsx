import React, { useState, useEffect } from "react";
import { TbSearch } from "react-icons/tb";
import { motion } from "framer-motion";

const Payments = [
  {
    id: 1,
    player: "Player One",
    coach: "Coach John",
    bookingRef: "BK001",
    date: "2025-08-20",
    method: "GCash",
    amount: 500,
    status: "Pending",
    proof: "https://via.placeholder.com/150",
    sport: "Basketball",
  },
  {
    id: 2,
    player: "Player Two",
    coach: "Coach Maria",
    bookingRef: "BK002",
    date: "2025-08-21",
    method: "Credit Card",
    amount: 700,
    status: "Completed",
    proof: "",
    sport: "Volleyball",
  },
  {
    id: 3,
    player: "Player Three",
    coach: "Coach Alex",
    bookingRef: "BK003",
    date: "2025-08-22",
    method: "Cash On-site",
    amount: 600,
    status: "Failed",
    proof: "https://via.placeholder.com/150",
    sport: "Swimming",
  },
];

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState({ status: "All", sport: "All" });
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => setPayments(Payments), []);

  const filteredPayments = payments.filter(
    (pay) =>
      (pay.player.toLowerCase().includes(searchText.toLowerCase()) ||
        pay.coach.toLowerCase().includes(searchText.toLowerCase()) ||
        pay.bookingRef.toLowerCase().includes(searchText.toLowerCase())) &&
      (filter.status === "All" || pay.status === filter.status) &&
      (filter.sport === "All" || pay.sport === filter.sport)
  );

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
        <motion.h2
          className="text-3xl font-extrabold flex items-center gap-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          💵 Manage Payments
        </motion.h2>

        {/* Search & Filters */}
        <motion.div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center bg-white shadow rounded-lg px-4 py-2 w-full lg:w-1/3">
            <TbSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by player, coach, or booking ID..."
              className="w-full outline-none text-gray-700"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <select
              className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white font-medium"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>

            <select
              className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white font-medium"
              value={filter.sport}
              onChange={(e) => setFilter({ ...filter, sport: e.target.value })}
            >
              <option value="All">All Sports</option>
              <option value="Basketball">Basketball</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Swimming">Swimming</option>
            </select>
          </div>
        </motion.div>

        {/* Payments Table */}
        <motion.div className="overflow-x-auto rounded-2xl shadow">
          <table className="w-full table-auto text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4 border">Player</th>
                <th className="p-4 border">Coach</th>
                <th className="p-4 border">Booking Ref</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Method</th>
                <th className="p-4 border">Amount (₱)</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((pay) => (
                  <tr
                    key={pay.id}
                    className="hover:bg-green-50 transition cursor-pointer"
                  >
                    <td className="p-4 border">{pay.player}</td>
                    <td className="p-4 border">{pay.coach}</td>
                    <td className="p-4 border">{pay.bookingRef}</td>
                    <td className="p-4 border">{pay.date}</td>
                    <td className="p-4 border">{pay.method}</td>
                    <td className="p-4 border">₱{pay.amount}</td>
                    <td
                      className={`p-4 border font-semibold ${
                        pay.status === "Completed"
                          ? "text-green-600"
                          : pay.status === "Pending"
                          ? "text-yellow-600"
                          : pay.status === "Failed"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {pay.status}
                    </td>
                    <td className="p-4 border">
                      <button
                        onClick={() => setSelectedPayment(pay)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-gray-500">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Payment Modal */}
        {selectedPayment && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <motion.div
              drag
              dragElastic={0.2}
              dragMomentum={false}
              className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden"
            >
              <div className="bg-green-600 text-white px-6 py-4 cursor-grab">
                <h3 className="text-xl font-bold text-center">
                  Payment Details - {selectedPayment.bookingRef}
                </h3>
              </div>
              <div className="p-6">
                <table className="w-full table-auto border text-left mb-4">
                  <tbody>
                    <tr>
                      <th className="border px-4 py-2 bg-green-600 text-white">Player</th>
                      <td className="border px-4 py-2">{selectedPayment.player}</td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 bg-green-600 text-white">Coach</th>
                      <td className="border px-4 py-2">{selectedPayment.coach}</td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 bg-green-600 text-white">Amount</th>
                      <td className="border px-4 py-2">₱{selectedPayment.amount}</td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 bg-green-600 text-white">Date</th>
                      <td className="border px-4 py-2">{selectedPayment.date}</td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 bg-green-600 text-white">Method</th>
                      <td className="border px-4 py-2">{selectedPayment.method}</td>
                    </tr>
                    <tr>
                      <th className="border px-4 py-2 bg-green-600 text-white">Status</th>
                      <td
                        className={`border px-4 py-2 font-semibold ${
                          selectedPayment.status === "Completed"
                            ? "text-green-600"
                            : selectedPayment.status === "Pending"
                            ? "text-yellow-600"
                            : selectedPayment.status === "Failed"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {selectedPayment.status}
                      </td>
                    </tr>
                    {selectedPayment.proof && (
                      <tr>
                        <th className="border px-4 py-2 bg-green-600 text-white">Proof of Payment</th>
                        <td className="border px-4 py-2">
                          <img
                            src={selectedPayment.proof}
                            alt="Proof"
                            className="w-48 h-48 object-cover rounded-lg"
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="flex justify-end gap-4 mt-4">
                  {selectedPayment.status === "Pending" && (
                    <>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentManagement;
