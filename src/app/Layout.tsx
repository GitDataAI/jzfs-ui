import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Common/Sidebar";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import { Outlet } from "react-router-dom";
import useAuth from "../store/useUsers.tsx";

const Layout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, init } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      await init();
      if (!user) {
        navigate("/auth/login");
      }
    };
    checkAuthStatus();
  }, [init, user, navigate]);

  return (
    <div className="flex w-screen h-screen bg-background dark:bg-background-darkmode">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1 h-full">
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
