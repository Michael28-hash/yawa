import React, { useState, useEffect } from "react";
import { TbCalendar, TbClock, TbCheck } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const ConductTraining = () => {
  const [sessions, setSessions] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list or calendar

  useEffect(() => {
    setSessions([
      {
        id: 1,
        player: "John Doe",
        date: "2025-08-25",
        time: "3:00 PM",
        status: "Confirmed",
        attended: false,
      },
      {
        id: 2,
        player: "Jane Smith",
        date: "2025-08-26",
        time: "5:00 PM",
        status: "Confirmed",
        attended: false,
      },
    ]);
  }, []);

  const markAttendance = (sessionId) => {
    setSessions(
      sessions.map((s) =>
        s.id === sessionId ? { ...s, attended: true, status: "Completed" } : s
      )
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Title with fade + delay */}
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        🏋️ Conduct Training Sessions
      </motion.h2>

      {/* View Mode Toggle */}
      <motion.div
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <button
          className={`px-4 py-2 rounded-lg ${
            viewMode === "list" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("list")}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            viewMode === "calendar" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("calendar")}
        >
          Calendar View
        </button>
      </motion.div>

      {/* List / Table View */}
      <AnimatePresence mode="wait">
        {viewMode === "list" && (
          <motion.div
            key="list-view"
            className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <table className="w-full table-auto border-collapse border border-gray-200 text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 border">Player</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Time</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, index) => (
                  <motion.tr
                    key={s.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <td className="p-3 border">{s.player}</td>
                    <td className="p-3 border">{s.date}</td>
                    <td className="p-3 border">{s.time}</td>
                    <td
                      className={`p-2 border rounded-full font-semibold ${
                        s.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {s.status}
                    </td>
                    <td className="p-3 border text-center">
                      {!s.attended ? (
                        <button
                          onClick={() => markAttendance(s.id)}
                          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                        >
                          <TbCheck className="mr-1" /> Mark Attendance
                        </button>
                      ) : (
                        <span className="text-gray-500 font-medium">
                          Attended
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <motion.div
            key="calendar-view"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {sessions.map((s, index) => (
              <motion.div
                key={s.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4}}
              >
                <div>
                  <p className="font-semibold">{s.player}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <TbCalendar /> {s.date} <TbClock /> {s.time}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      s.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {s.status}
                  </span>
                  <td className="p-3 border">
                    <div className="flex justify-center">
                      {!s.attended ? (
                        <button
                          onClick={() => markAttendance(s.id)}
                          className="flex items-center justify-center bg-green-600 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                        >
                          <TbCheck className="mr-2" />
                          <span>Mark Attendance</span>
                        </button>
                      ) : (
                        <span className="text-gray-500 font-medium">
                          Attended
                        </span>
                      )}
                    </div>
                  </td>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConductTraining;
