import React, { useState, useRef } from "react";
import {
  Dashboard,
  Insights,
  ReceiptLong,
  ViewInAr,
  Email,
  CurrencyExchange,
  ChevronRight,
  ChevronLeft, // Importando íconos para el toggle
} from "@mui/icons-material";
import LogoSer0VialImage from "../../../public/logo-ser0-vial.png";
import LogoImageSer0VialImage from "../../../public/logo-image-ser0-vial.png";

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const sidebarRef = useRef(null);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`dark:bg-dark-background text-light-text dark:text-dark-text bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] h-screen fixed top-0 left-0 py-6 px-4 font-[sans-serif] transition-all ${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      }`}
      ref={sidebarRef}
      style={{ zIndex: 10000 }}
    >
      <div
        className={`relative flex ${
          isCollapsed ? "justify-center" : "justify-start"
        } items-center`}
      >
        <a href="javascript:void(0)">
          <img
            src={isCollapsed ? LogoImageSer0VialImage : LogoSer0VialImage}
            alt="logo"
            className={`${isCollapsed ? "w-7 h-7" : "w-40"}`}
          />
        </a>

        <div
          className="absolute -right-6 top-2 h-6 w-6 p-[6px] cursor-pointer bg-primary flex items-center justify-center rounded-full"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" /> // Icono cuando está colapsado
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" /> // Icono cuando está expandido
          )}
        </div>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          <li>
            <a
              href="javascript:void(0)"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                <Dashboard className="w-full h-full" />
              </div>
              {!isCollapsed && (
                <span className="ml-4 transition-all opacity-100">
                  Dashboard
                </span>
              )}
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                <Insights className="w-full h-full" />
              </div>
              {!isCollapsed && (
                <span className="ml-4 transition-all opacity-100">Insight</span>
              )}
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                <ReceiptLong className="w-full h-full" />
              </div>
              {!isCollapsed && (
                <span className="ml-4 transition-all opacity-100">
                  People y terms
                </span>
              )}
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                <ViewInAr className="w-full h-full" />
              </div>
              {!isCollapsed && (
                <span className="ml-4 transition-all opacity-100">Product</span>
              )}
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                <Email className="w-full h-full" />
              </div>
              {!isCollapsed && (
                <span className="ml-4 transition-all opacity-100">Inbox</span>
              )}
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                <CurrencyExchange className="w-full h-full" />
              </div>
              {!isCollapsed && (
                <span className="ml-4 transition-all opacity-100">Refunds</span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
