import React from "react";
import { FiChevronLeft, FiHome, FiUser, FiSettings } from "react-icons/fi";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { label: "Home", icon: <FiHome />, href: "/" },
  { label: "About", icon: <FiUser />, href: "/about" },
  { label: "Settings", icon: <FiSettings />, href: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <div
      className={`bg-white text-black dark:bg-gray-800 dark:text-white transition-width duration-300 border-r border-gray-200 dark:border-gray-700 ${
        isCollapsed ? "w-14" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <span
          className={`text-lg font-bold text-primary dark:text-primary-dark ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          LOGO
        </span>
        <button
          onClick={onToggle}
          className="text-2xl text-black dark:text-white"
        >
          <FiChevronLeft
            className={`transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <div className="mr-3 text-xl">{item.icon}</div>
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
