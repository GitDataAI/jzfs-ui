import React, { useState } from "react";
import Sidebar from "@/components/Common/Sidebar";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background dark:bg-background-darkmode">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-5 bg-white dark:bg-gray-800">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
