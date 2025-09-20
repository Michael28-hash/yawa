import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { LayoutDashboard } from "lucide-react";
import { FiCalendar, FiBookOpen, FiBarChart2 } from "react-icons/fi"; // Add these imports
import {
  TbCalendarCheck,
  TbClockHour4,
  TbUserSearch,
  TbCreditCard,
  TbStar,
  TbChartLine,
} from "react-icons/tb";
const PlayerSidebar = ({ collapsed, setCurrentView, currentView }) => {
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
        {/* <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "browsecoach" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("browsecoach")}
        >
          <TbUserSearch
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              View Available Coach
            </span>
          )}
        </Button> */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "booksession" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("booksession")}
        >
          <TbCalendarCheck
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Book Session
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "attendsession" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("attendsession")}
        >
          <TbClockHour4
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Attend Session
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "payment" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("payment")}
        >
          <TbCreditCard
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">Payment</span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "ratecoach" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("ratecoach")}
        >
          <TbStar
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">Rate Coach</span>
          )}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-black  ${
            currentView === "trackhistory" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("trackhistory")}
        >
          <TbChartLine
            className="mr-1"
            style={{ height: "28px", width: "35px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Track History
            </span>
          )}
        </Button>
      </nav>
    </aside>
  );
};

export default PlayerSidebar;
