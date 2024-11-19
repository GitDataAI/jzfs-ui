import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../store/useUsers.tsx";
import Header from "@/components/layout/Header.tsx";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, init } = useAuth();
  const checkAuthStatus = async () => {
    try {
      await init();
      if (!user) {
        navigate("/auth/login");
      }
    }catch (e){
      navigate("/auth/login")
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, [init, user, navigate]);

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
