import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import {
  FiUsers, // Manage/Browse Coaches
  FiUserCheck, // Approvals / Confirmed Bookings
  FiDollarSign, // Payments / Track Payments
  FiStar, // Ratings
  FiCalendar, // Book/Attend Sessions
  FiActivity, // Performance Tracking
  FiClipboard, // Reports
} from "react-icons/fi";

const AdminSidebar = ({ collapsed, setCurrentView, currentView }) => {
  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60"
      } bg-[#4CA771] shadow-2xl transition-all duration-300 overflow-hidden`}
    >
      <div className="p-4 mt-2 flex flex-col items-center justify-center gap-y-1 pl-2">
        <img
          src="/images/fitness-removebg-preview.png"
          alt="PatientCare Logo"
          className={`transition-all duration-300 ${
            collapsed ? "w-32 opacity-100" : "w-32"
          } h-auto`}
        />
        {!collapsed && (
          <p className="text-m font-semibold text-white pt-1">
            SCB Management & Revenue{" "}
          </p>
        )}
      </div>

      <nav className="space-y-5 mt-3 ">
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "dashboard" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("dashboard")}
        >
          <LayoutDashboard
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">Dashboard</span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "availablecoach" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("availablecoach")}
        >
          <FiUsers
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m  text-white font-semibold">
              Coaches
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "account" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("account")}
        >
          <FiUserCheck
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="pr-8  text-white font-semibold">
              Manage Account
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "viewapplycoach" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("viewapplycoach")}
        >
          <FiClipboard
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="pr-8  text-white font-semibold">
              Coach Application
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "payment" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("payment")}
        >
          <FiDollarSign
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="pr-8 text-white font-semibold">
              Payment
            </span>
          )}
        </Button> 

        {/* <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "managerate" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("managerate")}
        >
          <FiStar
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="pr-8 text-white font-semibold">Manage Rate</span>
          )}
        </Button> */}

        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "bookinginformation" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("bookinginformation")}
        >
          <FiCalendar
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="pr-8 text-white font-semibold">
              Booking Information
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "activitylogs" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("activitylogs")}
        >
          <FiActivity
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="pr-8 text-white font-semibold">Activity Logs</span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "reports" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("reports")}
        >
          <FiClipboard
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">Reports</span>
          )}
        </Button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
