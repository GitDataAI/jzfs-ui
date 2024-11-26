import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../store/useUsers.tsx";
import Header from "@/components/layout/Header.tsx";
import {media} from "@/hooks/useMedia.tsx";


const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, init } = useAuth();
  const height = media.height

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
    console.log(media)

    checkAuthStatus().then();
  }, []);

  return (
    <>
      <div className="items-center justify-center mb-0" style={{height: height}}>
        <div className="flex flex-col h-screen w-full items-center justify-center" style={{height:height}}>
          <Header />
          <div className="w-full flex flex-grow ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
