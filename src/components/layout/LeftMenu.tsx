import React from "react";
import { Sidebar } from "primereact/sidebar";
import {useTranslation} from "react-i18next";

interface LeftMenuProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ isOpen, closeSidebar }) => {
  const [t] = useTranslation("Setting")
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
              {t("HomePage")}
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              {t("Notification")}
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              {t("Settings")}
            </a>
          </li>
          <li>
            <a href="#" className="text-md hover:text-blue-600">
              {t("Help")}
            </a>
          </li>
        </ul>
      </div>
    </Sidebar>
  );
};

export default LeftMenu;
