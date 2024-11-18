import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../store/useUsers.tsx";
import Header from "@/components/layout/Header.tsx";
import AuthApi from "@/libs/apis/auth_api.tsx";
import KeysApi from "@/libs/apis/keys_api.tsx";
import GroupApi from "@/libs/apis/group_api.tsx";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, init } = useAuth();
  const test = async () => {
    const keysApi = new KeysApi();
    const authApi = new AuthApi();
    const groupApi = new GroupApi();
    await groupApi.createGroup({
      name: "test",
      bio: "test",
      contact: "test",
    });
    // await authApi.login({
    //   username: "xxx",
    //   password: "xxx",
    // });
    const res = await keysApi.listToken();
    console.log(res);
  };
  useEffect(() => {
    test();
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
