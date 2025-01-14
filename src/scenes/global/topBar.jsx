import React, { useState, useRef } from "react";
import ThemeSwitch from "../global/topBar/themeSwitch";
import NotificationPopover from "../global/topBar/notificationPopover";
import SettingsPopover from "../global/topBar/settingsPopover";
import ProfilePopover from "../global/topBar/profilePopover";
import ThemeColorPickerPopover from "../global/topBar/themeColorPickerPopover";
import AvatarPopover from "../global/topBar/avatarPopover";
import { useSelector } from 'react-redux'

function Topbar({ isCollapsed }) {
  const [activePopover, setActivePopover] = useState(null);
  const user = useSelector(state => state.user)

  const handlePopoverToggle = (popover) => {
    setActivePopover((prevPopover) =>
      prevPopover === popover ? null : popover
    );
  };

  return (
    <header
      className={`dark:bg-dark-background text-light-text dark:text-dark-text bg-neutral-50 transition-all duration-300 ease-out fixed left-0 overflow-auto min-h-[60px] font-sans z-[1201] 
      ${
        !isCollapsed
          ? "ml-[250px] w-[calc(100%-250px)]"
          : "ml-[80px] w-[calc(100%-80px)]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between px-6 py-2 gap-4 w-full">
        {/* Menú colapsable */}
        <div id="collapseMenu" className="hidden lg:block">
          {/* Logo o botón del menú */}
        </div>

        {/* Iconos y perfil */}
        <div className="flex items-center space-x-4 relative">
         <ThemeSwitch/>

          {/* Popover de notificaciones */}
          <NotificationPopover
            isOpen={activePopover === "notifications"}
            onToggle={() => handlePopoverToggle("notifications")}
          />

          {/* Popover de ajustes */}
          <SettingsPopover
            isOpen={activePopover === "settings"}
            onToggle={() => handlePopoverToggle("settings")}
          />

          {/* Popover de perfil */}
          <ProfilePopover
            isOpen={activePopover === "profile"}
            onToggle={() => handlePopoverToggle("profile")}
          />

          {/* Popover de perfil */}
          <ThemeColorPickerPopover
            isOpen={activePopover === "theme"}
            onToggle={() => handlePopoverToggle("theme")}
          />

          {/* Popover de notificaciones */}
          <AvatarPopover
            isOpen={activePopover === "avatar"}
            onToggle={() => handlePopoverToggle("avatar")}
          />

          {/* Otros iconos */}
          {/* <span className="rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300">
            <img
              src={user.photo_url}
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover"
            />
          </span> */}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
