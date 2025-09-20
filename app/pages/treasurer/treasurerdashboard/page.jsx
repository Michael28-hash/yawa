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
import ManageCoachSalaries from "./components/ManageCoachSalary";
import ProcessCoachPayouts from "./components/ProcessCoachPayouts";
import TrackRevenue from "./components/TrackRevenue";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import {
  FaClipboardList,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import TreasurerLayout from "../layouts/treasurerlayout";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);
import { TbUser, TbFilter, TbArrowRight, TbArrowDown } from "react-icons/tb";


const TreasurerDashboard = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [fadeTransition, setFadeTransition] = useState(false);

  const SECRET_KEY = "my_secret_key_123456";

  // 1) decrypt on mount
  const decryptUserId = () => {
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
  };

  useEffect(() => {
    decryptUserId();
  }, [loggedInUserId]);

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
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <TreasurerLayout
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
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <motion.div
                variants={itemVariants}
                className="border border-white bg-white p-5 h-25 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-black font-semibold">
                    Total Bookings Student
                  </p>
                  <h2 className="text-2xl font-bold text-black">25</h2>
                </div>
                <div className="bg-green-800 text-white p-3 rounded-full">
                  <FaClipboardList className="text-xl" />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="border border-white bg-white p-5 h-25 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-black font-semibold">Scheduled</p>
                  <h2 className="text-2xl font-bold text-black">8</h2>
                </div>
                <div className="bg-green-800 text-white p-3 rounded-full">
                  <FaCalendarCheck className="text-xl" />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="border border-white bg-white p-5 h-25 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-black font-semibold">Complete</p>
                  <h2 className="text-2xl font-bold text-black">12</h2>
                </div>
                <div className="bg-green-800 text-white p-3 rounded-full">
                  <FaCheckCircle className="text-xl" />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="border border-white bg-white p-5 h-25 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-black font-semibold">Cancelled</p>
                  <h2 className="text-2xl font-bold text-black">5</h2>
                </div>
                <div className="bg-green-800 text-white p-3 rounded-full">
                  <FaTimesCircle className="text-xl" />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Left Column - Teacher Consultation and My Weekly Availability stacked */}
              <div className="col-span-2 flex flex-col gap-3">
                {/* Teacher Consultation Render Hours */}
                <motion.div
                  variants={chartVariants}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-black">
                      Student ui rani number of booking
                    </h2>
                    <motion.select
                      whileHover={{ scale: 1.05 }}
                      className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#00856F]"
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
                            label: "RenderHours",
                            data: [5, 8, 6, 10, 7, 12, 9, 11, 6, 8, 10, 7],
                            borderColor: "#4CA771",
                            backgroundColor: "#C0E6BA",
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
              </div>
            </div>

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
         {currentView === "managecoachsalary" && <ManageCoachSalaries />}
         {currentView === "trackrevenue" && <TrackRevenue />}
         {currentView === "processCoachPayout" && <ProcessCoachPayouts />}
      </motion.div>
    </TreasurerLayout>
  );
};



export default TreasurerDashboard;
