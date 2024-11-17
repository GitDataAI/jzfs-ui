import React from "react";
import { FiUser } from "react-icons/fi";
import ThemeToggler from "./ThemeToggler";

const Header: React.FC = () => {
  return (
    <header className="bg-white text-black dark:bg-gray-800 dark:text-white shadow-md p-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
      <h1 className="text-primary dark:text-primary-dark font-bold text-xl">
        Header
      </h1>

      <div className="flex items-center space-x-4">
        <ThemeToggler />

        <div className="flex items-center space-x-2">
          <FiUser className="text-2xl" />
          <span className="font-medium">Username</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
