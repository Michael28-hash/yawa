"use client";
import React, { useState } from "react";
import CoachSidebar from "./coachsidebar";
import CoachHeader from "./coachheader";

const CoachLayout = ({ children, currentView, setCurrentView }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <CoachSidebar
        collapsed={sidebarCollapsed}
        setCurrentView={setCurrentView}
        currentView={currentView}
      />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <CoachHeader
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          setCurrentView={setCurrentView}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CoachLayout;
