import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TbClockHour4 } from "react-icons/tb";

const AttendSession = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch booked sessions for logged-in student
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sessions");
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("❌ Failed to fetch sessions:", error);
      }
    };
    fetchSessions();
  }, []);

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-2 py-1 rounded-md text-xs font-medium text-white";

    switch (status) {
      case "Upcoming":
        return <span className={`${baseClasses} bg-green-600`}>Upcoming</span>;
      case "Completed":
        return <span className={`${baseClasses} bg-blue-600`}>Completed</span>;
      case "Canceled":
        return <span className={`${baseClasses} bg-red-600`}>Canceled</span>;
      default:
        return <span className={`${baseClasses} bg-gray-400`}>Unknown</span>;
    }
  };

  const isSoon = (dateTime) => {
    const now = new Date();
    const sessionTime = new Date(dateTime);
    const diffHours = (sessionTime - now) / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 24; // within 24 hours
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-xl font-bold mb-4 border-b pb-2">My Sessions</h1>

      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Coach</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Venue</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Reminder</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length > 0 ? (
            sessions.map((s, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{s.coach_name}</td>
                <td className="p-3">
                  {new Date(s.date).toLocaleDateString("en-PH")}
                </td>
                <td className="p-3">{s.time}</td>
                <td className="p-3">{s.venue}</td>
                <td className="p-3 text-center">{getStatusBadge(s.status)}</td>
                <td className="p-3 text-center">
                  {isSoon(`${s.date} ${s.time}`) ? (
                    <span className="flex items-center justify-center text-yellow-600 font-semibold">
                      <TbClockHour4 className="mr-1" /> Soon
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6">
                No sessions available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AttendSession;
