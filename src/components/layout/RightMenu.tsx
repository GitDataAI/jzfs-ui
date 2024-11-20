import React from "react";
import { Sidebar } from "primereact/sidebar"; // 引入 PrimeReact 的 Sidebar 组件
import {useTranslation} from "react-i18next";

interface RightMenuProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const RightMenu: React.FC<RightMenuProps> = ({ isOpen, closeSidebar }) => {
  const [t] = useTranslation("Setting")
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
              {t("MyAccount")}
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              {t("Settings")}
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              {t("Quit")}
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default RightMenu;
