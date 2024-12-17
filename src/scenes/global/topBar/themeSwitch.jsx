import React from "react";
import { Brightness7, Brightness2 } from "@mui/icons-material";
import { useTheme } from "../../../context/themeProvider";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div
      onClick={handleToggle}
      className={`border border-blue-400 relative w-[40px] h-[22px] flex items-center cursor-pointer rounded-full transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-blue-400"
      }`}
    >
      {/* Icono del Sol */}
      <Brightness7
        className={`absolute text-blue-400 transition-opacity ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          fontSize: "1rem",
          transition: "opacity 0.3s ease",
          left: "3px",
        }}
      />
      {/* Icono de la Luna */}
      <Brightness2
        className={`absolute text-gray-800 transition-opacity ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
        style={{
          fontSize: "1rem",
          transition: "opacity 0.3s ease",
          right: "3px",
        }}
      />
      {/* Indicador deslizante */}
      <div
        className={`absolute bg-white border border-gray-300 rounded-full h-[18px] w-[18px] transition-transform ${
          isDarkMode ? "translate-x-[18px]" : "translate-x-[2px]"
        }`}
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
      ></div>
    </div>
  );
};

export default ThemeSwitch;
