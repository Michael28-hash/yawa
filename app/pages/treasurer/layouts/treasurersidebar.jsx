import React from "react";
import { Button } from "@/components/ui/button";

import { LayoutDashboard } from "lucide-react";

import {
  FiUsers,
  FiUserCheck,
  FiDollarSign,
  FiStar,
  FiCalendar,
  FiBarChart2,
  FiActivity,
  FiCreditCard,
} from "react-icons/fi";

const TreasurerSidebar = ({ collapsed, setCurrentView, currentView }) => {
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
            SCB Management & Revenue
          </p>
        )}
      </div>

      <nav className="space-y-5 mt-3">
        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
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

        {/* Manage Players Payment Button */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-black ${
            currentView === "managecoachsalary" ? "bg-[#013237]" : ""
          }`}
          onClick={() => setCurrentView("managecoachsalary")}
        >
          <FiDollarSign
            className="mr-2"
            style={{ height: "24px", width: "24px", color: "#ffffffff" }}
          />
          {!collapsed && (
            <span className="text-m text-white font-semibold">
              Manage Coach Salary
            </span>
          )}
        </Button>
         <Button
        variant="ghost"
        className={`w-full justify-start text-black ${
          currentView === "trackrevenue" ? "bg-[#013237]" : ""
        }`}
        onClick={() => setCurrentView("trackrevenue")}
      >
        <FiBarChart2
          className="mr-2"
          style={{ height: "24px", width: "24px", color: "#ffffffff" }}
        />
        {!collapsed && (
          <span className="text-m text-white font-semibold">Track Revenue</span>
        )}
      </Button>
      <Button
      variant="ghost"
      className={`w-full justify-start text-black ${
        currentView === "processCoachPayout" ? "bg-[#013237]" : ""
      }`}
      onClick={() => setCurrentView("processCoachPayout")}
    >
      <FiCreditCard
        className="mr-2"
        style={{ height: "24px", width: "24px", color: "#ffffffff" }}
      />
      {!collapsed && (
        <span className="text-m text-white font-semibold">
          Process Coach Payout
        </span>
      )}
    </Button>
      </nav>
    </aside>
  );
};

export default TreasurerSidebar;
