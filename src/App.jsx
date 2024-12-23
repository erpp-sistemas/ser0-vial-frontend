import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./scenes/login";
import Topbar from "./scenes/global/topBar";
import Sidebar from "./scenes/global/sideBar";
import Home from "./scenes/home";
import './App.css';

function App() {
  const [login, setLogin] = useState(null); // Estado para manejar el login
  const [isCollapsed, setIsCollapsed] = useState(true); // Estado para manejar el colapso del sidebar

  const themeColor = useSelector((state) => state.user.theme_color || "#2196F3");

  useEffect(() => {
    if (themeColor) {
      document.documentElement.style.setProperty("--primary-color", themeColor);
    }
  }, [themeColor]);

  return (
    <>
      {login === null ? (
        // Mostrar solo el componente Login si no hay sesión
        <Routes>
          <Route path="/" key="login" element={<Login setLogin={setLogin} />} />
        </Routes>
      ) : (
        // Layout principal cuando el usuario ha iniciado sesión
        <div className="flex dark:bg-dark-background transition-all duration-300 ease-in-out bg-gray-100">
          {/* Sidebar */}
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Contenido principal */}
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isCollapsed ? "ml-[80px]" : "ml-[250px]"
            }`}
          >
            {/* Topbar */}
            <Topbar isCollapsed={isCollapsed} />

            {/* Rutas */}
            <div className="pt-[60px] pl-8 pr-8"> {/* Espaciado del contenido */}
              <Routes>
                <Route path="/" key="home" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
