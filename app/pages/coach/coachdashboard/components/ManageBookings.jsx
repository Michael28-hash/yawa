import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbCheck, TbX, TbCalendar, TbClock, TbMapPin } from "react-icons/tb";
import { FaClipboardList, FaCalendarCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ManageBookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  useEffect(() => {
    setPendingBookings([
      { id: 1, player: "John Doe", date: "2025-08-25", time: "3:00 PM", venue: "Gym A" },
      { id: 2, player: "Jane Smith", date: "2025-08-26", time: "5:00 PM", venue: "Court B" },
    ]);
    setConfirmedBookings([
      { id: 3, player: "Alex Tan", date: "2025-08-20", time: "2:00 PM", venue: "Gym C" },
    ]);
  }, []);

  const handleApprove = (booking) => {
    setPendingBookings((prev) => prev.filter((b) => b.id !== booking.id));
    setConfirmedBookings((prev) => [...prev, booking]);
  };

  const handleReject = (booking) => {
    setPendingBookings((prev) => prev.filter((b) => b.id !== booking.id));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
       <motion.h2
              className="text-3xl font-extrabold mb-8 flex items-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              📋 Manage Bookings
            </motion.h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Bookings",
            value: pendingBookings.length + confirmedBookings.length,
            icon: <FaClipboardList className="text-2xl" />,
          },
          {
            title: "Scheduled",
            value: pendingBookings.length,
            icon: <FaCalendarCheck className="text-2xl" />,
          },
          {
            title: "Confirmed",
            value: confirmedBookings.length,
            icon: <FaCheckCircle className="text-2xl" />,
          },
          {
            title: "Cancelled",
            value: 0,
            icon: <FaTimesCircle className="text-2xl" />,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <h2 className="text-2xl font-bold text-black">{card.value}</h2>
            </div>
            <div className="bg-green-600 text-white p-4 rounded-full">{card.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Pending Bookings */}
     <motion.div
             className="bg-white rounded-2xl shadow-lg overflow-hidden"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
        <h3 className="text-xl font-semibold mb-4">⏳ Pending Booking Requests</h3>
        {pendingBookings.length === 0 ? (
          <p className="text-gray-500">No pending bookings.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200 text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 border">Player</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Venue</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((b, i) => (
                <motion.tr
                  key={b.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border">{b.player}</td>
                  <td className="p-3 border">{b.date}</td>
                  <td className="p-3 border">{b.time}</td>
                  <td className="p-3 border">{b.venue}</td>
                  <td className="p-3 border flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(b)}
                      className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                    >
                      <TbCheck className="mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(b)}
                      className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                    >
                      <TbX className="mr-1" /> Reject
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Confirmed Bookings */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4">✅ Confirmed Sessions</h3>
        {confirmedBookings.length === 0 ? (
          <p className="text-gray-500">No confirmed bookings.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200 text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 border">Player</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Venue</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBookings.map((b, i) => (
                <motion.tr
                  key={b.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border">{b.player}</td>
                  <td className="p-3 border">{b.date}</td>
                  <td className="p-3 border">{b.time}</td>
                  <td className="p-3 border">{b.venue}</td>
                  <td className="p-2 border rounded-full bg-blue-100 text-blue-800 font-semibold">
                    Confirmed
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
};

export default ManageBookings;
