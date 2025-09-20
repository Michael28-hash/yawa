import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TbListDetails,
  TbCurrencyDollar,
  TbPlayerPlay,
  TbStarFilled,
  TbReportAnalytics,
  TbCalendarTime,
  TbMessage,
  TbBell,
} from "react-icons/tb";

import { LayoutDashboard } from "lucide-react";
const CoachSidebar = ({ collapsed, setCurrentView, currentView }) => {
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
            currentView === "setavailability" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("setavailability")}
        >
          <TbCalendarTime
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Set Availability
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "managebooking" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("managebooking")}
        >
          <TbListDetails
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Manage Bookings
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "trackpayment" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("trackpayment")}
        >
          <TbCurrencyDollar
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Track Payment
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "conducttraining" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("conducttraining")}
        >
          <TbPlayerPlay
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Conduct Training
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "viewratings" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("viewratings")}
        >
          <TbStarFilled
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              View Ratings
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "messages" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("messages")}
        >
          <TbMessage
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">Messages</span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "reports" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("reports")}
        >
          <TbReportAnalytics
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

export default CoachSidebar;
