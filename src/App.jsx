import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./scenes/login";
import Topbar from "./scenes/global/topBar";
import Sidebar from "./scenes/global/sideBar";
import Home from "./scenes/home";
import './App.css';
import Cookies from 'js-cookie'
import { setUser } from "./redux/userSlice";

function App() {
  const [login, setLogin] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [identification, setIdentification] = useState(false)

  let location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const cookies = Cookies.get()
    if (location.pathname.includes('identification')) {
      setLogin(null)
      setIdentification(true)
      return
    }

    setIdentification(false)

    const user = sessionStorage.getItem('user_session')
    if (user) {
      setLogin(true)
      generateDataUser(JSON.parse(user))
    } else {
      setLogin(null)
    }
  }, [])

  const generateDataUser = (data_user) => {    
    const obj = {
      user_id: data_user.user_id,
      username: data_user.username,
      password: data_user.password,
      first_name: data_user.first_name,
      middle_name: data_user.middle_name,
      paternal_surname: data_user.paternal_surname,
      maternal_surname: data_user.maternal_surname,
      birthdate: data_user.birthdate,
      photo_url: data_user.photo_url,
      entry_date: data_user.entry_date,
      low_date: data_user.low_date,
      active: data_user.active,
      access_web: data_user.access_app_web,
      access_movil: data_user.access_movil,
      role_id: data_user.role_id,   
      theme_color: data_user.theme_color   
      //token: data_user.token,
    };
    dispatch(setUser(obj))
  }

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
        <div className="flex dark:bg-dark-background transition-all duration-300 ease-in-out bg-neutral-50">
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
