import React, { useState, useRef, useEffect } from "react";
import {
  Dashboard,
  Insights,
  ReceiptLong,
  ViewInAr,
  Email,
  CurrencyExchange,
  ChevronRight,
  ChevronLeft, // Importando íconos para el toggle
  LocationOn,
  BusinessCenter,
  Report,
  SearchOff,
  MyLocation,
  Map
} from "@mui/icons-material";
import LogoSer0VialImage from "../../../public/logo-ser0-vial.png";
import LogoImageSer0VialImage from "../../../public/logo-image-ser0-vial.png";
import LogoSer0VialDarkImage from "../../../public/logo-ser0-vial-white.png";
import LogoImageSer0VialDarkImage from "../../../public/logo-image-ser0-vial-white.png";
import {getMenusByUserId} from '../../services/menu.service'
import { useSelector } from 'react-redux'


function Sidebar({ isCollapsed, setIsCollapsed }) {
  const sidebarRef = useRef(null);
  const [menus, setMenus] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false);

  const user = useSelector((state) => state.user)

  // Mapeo de iconos
  const iconMap = {
    LocationOnIcon: LocationOn,
    BusinessCenterIcon: BusinessCenter,
    ReportIcon: Report,
    SearchOffIcon: SearchOff,
    MyLocationIcon: MyLocation,
    MapIcon: Map,
  };

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

    // Detecta si la clase `dark` cambia
    const observer = new MutationObserver(() => handleThemeChange());
    observer.observe(document.documentElement, { attributes: true });

    // Establecer estado inicial
    handleThemeChange();

    return () => observer.disconnect();
  }, []);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Construcción del árbol de menús
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

  // Renderizar icono dinámico
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || LocationOn; // Ícono predeterminado
    return <IconComponent />;
  };

  return (
    <nav
      className={`dark:bg-dark-background text-light-text dark:text-dark-text bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] h-screen fixed top-0 left-0 py-6 px-4 font-[sans-serif] transition-all ${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      }`}
      style={{ zIndex: 10000 }}
    >
      {/* Encabezado */}
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

      {/* Menús dinámicos */}
      <div className="overflow-auto py-6 h-full mt-4">
        {Object.entries(menuTree).map(([section, items]) => (
          <div key={section} className="mb-4">
            {!isCollapsed && (
              <h4 className="text-xs text-primary font-bold mb-2">{section}</h4>
            )}
            <ul className="space-y-1">
              {items.map((menu) => (
                <li key={menu.id_menu}>
                  <a
                    href={menu.route}
                    className={`text-black dark:text-white dark:hover:text-primary hover:text-primary text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center text-primary">
                      {renderIcon(menu.icon)}
                    </div>
                    {!isCollapsed && (
                      <span className="ml-4">{menu.name}</span>
                    )}
                  </a>
                  {menu.submenus.length > 0 && (
                    <ul className={`pl-6 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                      {menu.submenus.map((submenu) => (
                        <li key={submenu.id_menu}>
                          <a
                            href={submenu.route}
                            className="text-black hover:text-primary text-[14px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
                          >
                            <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                              {renderIcon(submenu.icon)}
                            </div>
                            {!isCollapsed && (
                              <span className="ml-4">{submenu.name}</span>
                            )}
                          </a>
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
