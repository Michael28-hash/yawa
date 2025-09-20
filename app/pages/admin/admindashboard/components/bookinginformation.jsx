import React, { useState } from "react";
import { motion } from "framer-motion";

const Bookings = [
  {
    id: 1,
    ref: "BK-001",
    player: "John Player",
    coach: "Juan Dela Cruz",
    sport: "Basketball",
    date: "2025-08-25",
    time: "10:00 AM",
    venue: "Court A",
    bookingStatus: "Pending",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    ref: "BK-002",
    player: "Maria Player",
    coach: "Maria Santos",
    sport: "Swimming",
    date: "2025-08-26",
    time: "2:00 PM",
    venue: "Pool B",
    bookingStatus: "Confirmed",
    paymentStatus: "Pending",
  },
  {
    id: 3,
    ref: "BK-003",
    player: "Pedro Player",
    coach: "Pedro Reyes",
    sport: "Volleyball",
    date: "2025-08-27",
    time: "5:00 PM",
    venue: "Court C",
    bookingStatus: "Cancelled",
    paymentStatus: "Failed",
  },
];

const BookingManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [sportFilter, setSportFilter] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const [bookingList, setBookingList] = useState(Bookings);

  const filteredBookings = bookingList.filter((b) => {
    const matchesSearch =
      b.player.toLowerCase().includes(search.toLowerCase()) ||
      b.coach.toLowerCase().includes(search.toLowerCase()) ||
      b.ref.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || b.bookingStatus === statusFilter;
    const matchesPayment =
      paymentFilter === "All" || b.paymentStatus === paymentFilter;
    const matchesSport = sportFilter === "All" || b.sport === sportFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesSport;
  });

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setViewModal(true);
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setUpdateModal(true);
  };

  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    setCancelModal(true);
  };

  const confirmCancel = () => {
    setBookingList((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id ? { ...b, bookingStatus: "Cancelled" } : b
      )
    );
    setCancelModal(false);
    setSelectedBooking(null);
  };

  const saveUpdate = (updatedBooking) => {
    setBookingList((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
    );
    setUpdateModal(false);
    setSelectedBooking(null);
  };

  return (
    <motion.div
      className="p-6 min-h-screen bg-gray-100"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl font-extrabold mb-6 flex items-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        📋 View Booking List
      </motion.h2>

      {/* Filters & Search */}
      <motion.div className="flex flex-wrap gap-3 mb-6">
        <select
          className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 bg-green-600 shadow text-white"
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
        >
          <option value="All">All Sports</option>
          <option value="Basketball">Basketball</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Swimming">Swimming</option>
        </select>

        <input
          type="text"
          placeholder="Search by player, coach, or booking ID..."
          className="border rounded-lg px-4 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Booking Table */}
      <motion.div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-green-600 text-white text-center">
            <tr>
              <th className="p-3 border">Ref</th>
              <th className="p-3 border">Player</th>
              <th className="p-3 border">Coach</th>
              <th className="p-3 border">Sport</th>
              <th className="p-3 border">Date & Time</th>
              <th className="p-3 border">Venue</th>
              <th className="p-3 border">Booking Status</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{b.ref}</td>
                  <td className="p-3 border">{b.player}</td>
                  <td className="p-3 border">{b.coach}</td>
                  <td className="p-3 border">{b.sport}</td>
                  <td className="p-3 border">
                    {b.date} / {b.time}
                  </td>
                  <td className="p-3 border">{b.venue}</td>
                  <td
                    className={`p-3 border font-semibold ${
                      b.bookingStatus === "Pending"
                        ? "text-yellow-600"
                        : b.bookingStatus === "Cancelled"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {b.bookingStatus}
                  </td>
                  <td
                    className={`p-3 border font-semibold ${
                      b.paymentStatus === "Paid"
                        ? "text-green-600"
                        : b.paymentStatus === "Failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {b.paymentStatus}
                  </td>
                  <td className="p-3 border text-center">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => handleView(b)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleUpdate(b)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleCancel(b)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 border text-center" colSpan="9">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* View Modal */}
      {viewModal && selectedBooking && (
        <motion.div
          drag
          dragMomentum={false}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white text-center py-3">
              <h3 className="text-xl font-bold">Booking Details</h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <table className="w-full border-collapse">
                <tbody>
                  {Object.entries(selectedBooking).map(([key, value]) => (
                    <tr key={key}>
                      <td className="border p-2 font-semibold capitalize bg-green-600 text-white">
                        {key}
                      </td>
                      <td className="border p-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => setViewModal(false)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Update Modal */}
      {updateModal && selectedBooking && (
        <motion.div
          drag
          dragMomentum={false}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white text-center py-3">
              <h3 className="text-xl font-bold">Update Booking</h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <table className="w-full border-collapse mb-4">
                <tbody>
                  <tr>
                    <td className="border p-2 font-semibold bg-green-600 text-white">
                      Booking Status
                    </td>
                    <td className="border p-2">
                      <select
                        value={selectedBooking.bookingStatus}
                        onChange={(e) =>
                          setSelectedBooking({
                            ...selectedBooking,
                            bookingStatus: e.target.value,
                          })
                        }
                        className="border w-full p-2 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold bg-green-600 text-white">
                      Payment Status
                    </td>
                    <td className="border p-2">
                      <select
                        value={selectedBooking.paymentStatus}
                        onChange={(e) =>
                          setSelectedBooking({
                            ...selectedBooking,
                            paymentStatus: e.target.value,
                          })
                        }
                        className="border w-full p-2 rounded"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setUpdateModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveUpdate(selectedBooking)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingManagement;
