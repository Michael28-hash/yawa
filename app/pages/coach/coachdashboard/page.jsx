"use client";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler
);
import { Line } from "react-chartjs-2";
import CryptoJS from "crypto-js";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import CoachLayout from "../layouts/coachlayout";
import ManageBookings from "./components/ManageBookings";
import TrackPayments from "./components/TrackPayments";
import ConductTraining from "./components/ConductTraining";
import ViewRatings from "./components/ViewRatings";
import SetAvailability from "./components/SetAvailability";
import CoachProfile from "./components/CoachProfile";
import Messages from "./components/Message";
import Reports from "./components/Reports";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const CoachDashboard = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [fadeTransition, setFadeTransition] = useState(false);

  const SECRET_KEY = "my_secret_key_123456";

  // decrypt on mount
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const chartVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: 25,
      icon: <FaClipboardList className="text-xl" />,
      color: "bg-green-600",
    },
    {
      title: "Scheduled",
      value: 8,
      icon: <FaCalendarCheck className="text-xl" />,
      color: "bg-green-600",
    },
    {
      title: "Completed",
      value: 12,
      icon: <FaCheckCircle className="text-xl" />,
      color: "bg-green-600",
    },
    {
      title: "Cancelled",
      value: 5,
      icon: <FaTimesCircle className="text-xl" />,
      color: "bg-green-600",
    },
  ];

  return (
    <CoachLayout
      currentView={currentView}
      setCurrentView={(v) => {
        if (v !== currentView) {
          setFadeTransition(true);
          setTimeout(() => {
            setCurrentView(v);
            setTimeout(() => setFadeTransition(false), 50);
          }, 300);
        }
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`transition-opacity duration-300 ${
          fadeTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentView === "dashboard" && (
          <>
            {/* Dashboard Title */}
            <motion.h2
              className="text-3xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              📊 Coach Dashboard
            </motion.h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      {card.title}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {card.value}
                    </h2>
                  </div>
                  <div className={`${card.color} text-white p-4 rounded-full`}>
                    {card.icon}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart Section */}
            <motion.div
              variants={chartVariants}
              className="bg-white p-6 rounded-2xl shadow-lg mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  📈 Monthly Bookings Trend
                </h3>
                <motion.select
                  whileHover={{ scale: 1.05 }}
                  className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="0">All</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m, idx) => (
                    <option key={idx} value={idx + 1}>
                      {m}
                    </option>
                  ))}
                </motion.select>
              </div>
              <div className="h-[300px]">
                <Line
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        label: "Bookings",
                        data: [5, 8, 6, 10, 7, 12, 9, 11, 6, 8, 10, 7],
                        borderColor: "#16a34a",
                        backgroundColor: "rgba(34,197,94,0.3)",
                        tension: 0.4,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "top" } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
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
          </>
        )}
        {currentView === "profile" && <CoachProfile/>}
        {currentView === "setavailability" && <SetAvailability />}
        {currentView === "managebooking" && <ManageBookings />}
        {currentView === "trackpayment" && <TrackPayments />}
        {currentView === "conducttraining" && <ConductTraining />}
        {currentView === "viewratings" && <ViewRatings />}
        {currentView === "messages" && <Messages />}
        {currentView === "reports" && <Reports />}
      </motion.div>
    </CoachLayout>
  );
};

export default CoachDashboard;
