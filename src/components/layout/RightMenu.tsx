import React from "react";
import { Sidebar } from "primereact/sidebar"; // 引入 PrimeReact 的 Sidebar 组件

interface RightMenuProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const RightMenu: React.FC<RightMenuProps> = ({ isOpen, closeSidebar }) => {
  return (
    <Sidebar
      visible={isOpen}
      onHide={closeSidebar}
      position="right"
      className="custom-sidebar"
      showCloseIcon={true}
    >
      <div className="p-4">
        <ul className="mt-4 space-y-4">
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              我的账户
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              设置
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              退出
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default RightMenu;
