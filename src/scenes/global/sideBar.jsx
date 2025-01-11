import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, ChevronLeft, LocationOn } from "@mui/icons-material";
import LogoSer0VialImage from "../../../public/logo-ser0-vial.png";
import LogoImageSer0VialImage from "../../../public/logo-image-ser0-vial.png";
import LogoSer0VialDarkImage from "../../../public/logo-ser0-vial-white.png";
import LogoImageSer0VialDarkImage from "../../../public/logo-image-ser0-vial-white.png";
import { getMenusByUserId } from "../../services/menu.service";
import { useSelector } from "react-redux";
import * as MUIIcons from "@mui/icons-material";
import NotificationPopover from "../global/topBar/notificationPopover";
import Tooltip from "../global/sidebar/tooltip";

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const sidebarRef = useRef(null);
  const [menus, setMenus] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);  
  const location = useLocation(); // Hook para obtener la ruta actual

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const response = await getMenusByUserId(user.user_id);
        setMenus(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadMenus();
  }, [user.user_id]);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(() => handleThemeChange());
    observer.observe(document.documentElement, { attributes: true });

    handleThemeChange();

    return () => observer.disconnect();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const buildMenuTree = (menus) => {
    const menuTree = {};
    menus.forEach((menu) => {
      if (!menuTree[menu.section]) {
        menuTree[menu.section] = [];
      }
      if (menu.id_menu_parent === 0) {
        menuTree[menu.section].push({
          ...menu,
          submenus: [],
        });
      } else {
        const parentIndex = menuTree[menu.section].findIndex(
          (item) => item.id_menu === menu.id_menu_parent
        );
        if (parentIndex !== -1) {
          menuTree[menu.section][parentIndex].submenus.push(menu);
        }
      }
    });
    return menuTree;
  };

  const menuTree = buildMenuTree(menus);

  const renderIcon = (iconName) => {
    const IconComponent = MUIIcons[iconName] || LocationOn;
    return <IconComponent />;
  };

  const isActiveMenu = (route) => {
    return location.pathname === route ? "bg-gray-300 dark:bg-gray-600 " : "";
  };  

  return (
    <nav
      className={`dark:bg-dark-background text-light-text dark:text-dark-text bg-white shadow-[0_2px_10px_rgba(107,114,128,1)] h-screen fixed top-0 left-0 py-6 px-4 font-[sans-serif] transition-all ${isCollapsed ? "w-[80px]" : "w-[250px]"}`}
      style={{ zIndex: 10000 }}
    >
      <div className="relative flex justify-center items-center">
        <a href="javascript:void(0)">
          <img
            src={
              isCollapsed
                ? isDarkMode
                  ? LogoImageSer0VialDarkImage
                  : LogoImageSer0VialImage
                : isDarkMode
                ? LogoSer0VialDarkImage
                : LogoSer0VialImage
            }
            alt="logo"
            className={`${isCollapsed ? "w-7 h-7" : "w-40"}`}
          />
        </a>
        <div
          className="absolute -right-6 top-2 h-6 w-6 p-[6px] cursor-pointer bg-primary flex items-center justify-center rounded-full"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        {Object.entries(menuTree).map(([section, items]) => (
          <div key={section} className="mb-4">
            {!isCollapsed && (
              <h4 className="text-xs text-primary font-bold mb-2">{section}</h4>
            )}
            <ul className="space-y-1">
              {items.map((menu) => (
                <li key={menu.id_menu}>
                  <Link
                    to={menu.route}
                    className={`text-black dark:text-white dark:hover:text-primary hover:text-primary text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isCollapsed ? "justify-center" : ""} ${isActiveMenu(menu.route)}`}
                  >
                    {isCollapsed ? (
                      <Tooltip text={menu.name} position="right">
                        <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center text-primary">
                          {renderIcon(menu.icon)}
                        </div>
                      </Tooltip>
                    ) : (
                      <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center text-primary">
                        {renderIcon(menu.icon)}
                      </div>
                    )}
                    {!isCollapsed && <span className="ml-4">{menu.name}</span>}
                  </Link>
                  {menu.submenus.length > 0 && (
                    <ul className={`pl-6 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                      {menu.submenus.map((submenu) => (
                        <li key={submenu.id_menu}>
                          <Link
                            to={submenu.route}
                            className={`text-black hover:text-primary text-[14px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActiveMenu(submenu.route)}`}
                          >
                            <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                              {renderIcon(submenu.icon)}
                            </div>
                            {!isCollapsed && (
                              <span className="ml-4">{submenu.name}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
