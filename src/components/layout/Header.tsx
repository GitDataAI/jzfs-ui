import React, {useRef, useState} from "react";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import LeftMenu from "./LeftMenu"; // 引入 LeftMenu 组件
import RightMenu from "./RightMenu"; // 引入 RightMenu 组件
import {useTranslation} from "react-i18next";
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import {Button} from "primereact/button";
import {TabMenu} from "primereact/tabmenu";

const Header: React.FC = () => {
  const [t]=useTranslation("Setting")
  const [isMenuOpen, setLeftMenuOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false); // 用来控制右侧菜单的显示
  const menuLeft = useRef<Menu>(null);
  // const item = [
  //   {
  //     label: '文件系统',
  //     icon: 'pi pi-home',
  //     URL:'../Repositories'
  //   },
  //   {
  //     label: '执行器',
  //     icon: 'pi pi-list'
  //   },
  //   {
  //     label: "团体",
  //     icon: 'pi pi-inbox'
  //   }
  // ];
  const items: MenuItem[] = [
    {
      label:'Options',
      items: [
        {
          label: 'New repository',
          icon: 'pi pi-file'
        },
        {
          label: 'Import repository',
          icon: 'pi pi-file-arrow-up'
        },
        { separator: true },
        {
          label:'New code space',
          icon:'pi pi-credit-card'
        },
        {
          label:'New gist',
          icon:'pi pi-arrows-h'
        },
        { separator: true },
        {
          label:'New organization',
          icon:'pi pi-building',
          url:'../../Create/Organization'
        },
        {
          label:'New project',
          icon:'pi pi-calendar',

        },

      ]
    }
  ];

  return (
    <>
      <header className="w-full p-3 flex justify-between items-center h-14">
        <div className=" flex items-center gap-4">
          <button
            onClick={() => {
              setLeftMenuOpen(true);
            }}
            className="bg-white border border-gray-300 p-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <LuMenu className="text-xl" />
          </button>
          {/*<TabMenu model={item} />*/}
          <div className="flex items-center">
            <Link
              to="/Repositories"
              className="bg-white border border-gray-300 rounded-l-sm px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {t("Repositories")}
            </Link>
            <Link
              to="/Actions"
              className="bg-white border-t border-b border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {t("Actions")}
            </Link>
            <Link
              to="/Group"
              className="bg-white border border-gray-300 rounded-r-sm px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {t("Group")}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-sm p-1 md:px-3 md:py-1 bg-white shadow-sm">
            <input
              type="text"
              placeholder={t("Search")}
              className="flex-grow text-sm text-gray-700 placeholder-gray-500 focus:outline-none  hidden sm:hidden md:block lg:block"
            />
            <button className="p-0.5 md:p-1 text-gray-500 hover:text-gray-700">
              <BsSearch className="text-md" />
            </button>
          </div>
          <div className="flex items-center hidden sm:hidden md:block lg:block">
            <button className="bg-white border border-gray-300 rounded-l-sm p-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
              <FaPlus className="text-gray-700" />
            </button>
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <button className="bg-white border border-l-0 border-gray-300 rounded-r-sm p-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none" onClick={(event) => menuLeft.current?.toggle(event)} aria-controls="popup_menu_left" aria-haspopup>
              <FaChevronDown className="text-gray-700"/>
            </button>

            {/*<Button label="" icon="pi " className="mr-2" onClick={(event) => menuLeft.current?.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />*/}
          </div>
          <div
            className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setIsRightMenuOpen(true)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      <LeftMenu
        isOpen={isMenuOpen}
        closeSidebar={() => setLeftMenuOpen(false)}
      />

      <RightMenu
        isOpen={isRightMenuOpen}
        closeSidebar={() => setIsRightMenuOpen(false)}
      />
    </>
  );
};

export default Header;
