import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../store/useUsers.tsx";
import Header from "@/components/layout/Header.tsx";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, init } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await init();
      if (!user) {
        navigate("/auth/login");
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="w-full flex flex-grow items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
