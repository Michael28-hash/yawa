"use client";
import React, { useState } from 'react';
import TreasurerSidebar from './treasurersidebar';
import TreasurerHeader from './treasurerheader';

const TreasurerLayout = ({ children, currentView, setCurrentView }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <TreasurerSidebar
        collapsed={sidebarCollapsed}
        setCurrentView={setCurrentView}
        currentView={currentView}
      />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <TreasurerHeader toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
          setCurrentView={setCurrentView}
          />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default TreasurerLayout; 
