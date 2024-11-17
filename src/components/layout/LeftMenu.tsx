import React from "react";
import { Sidebar } from "primereact/sidebar";

interface LeftMenuProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ isOpen, closeSidebar }) => {
  return (
    <Sidebar
      visible={isOpen}
      onHide={closeSidebar}
      position="left"
      className="custom-sidebar"
      showCloseIcon={true}
    >
      <div className="p-4">
        <ul className="mt-4 space-y-4">
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              首页
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              通知
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              设置
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              帮助
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default LeftMenu;
