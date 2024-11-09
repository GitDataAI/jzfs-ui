import React from "react";
import { Outlet } from "react-router-dom";
import ThemeToggler from "@/components/Common/ThemeToggler";
import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/Common/LanguageSwitcher";

const AuthLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-primary-dark to-background p-4">
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 bg-transparent px-10">
        <Link to="/" className="text-white text-2xl font-bold">
          GitDataAi Cloud
        </Link>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </header>

      <div className="hidden lg:flex w-1/2 flex-col items-center text-white p-8 space-y-4">
        <h2 className="text-4xl font-bold">关于 GitDataAi Cloud</h2>
        <p className="text-lg max-w-md text-center">
          GitDataAi Cloud
          是一个用于数据管理、可视化和分析的平台，帮助您高效地管理和探索数据资源。
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
