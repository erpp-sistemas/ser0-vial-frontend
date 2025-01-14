import React, { useState, useRef, useEffect } from "react";
import { Logout, NotificationsActive } from "@mui/icons-material";
import QuestionsImage from "../../../../public/Questions.svg";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AvatarPopover = ({ isOpen, onToggle }) => {
  const iconRef = useRef(null);
  const popoverRef = useRef(null); // Referencia al popover
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePopover = () => {
    if (!isOpen && iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: iconRect.bottom + 8, // Debajo del icono
        left: iconRect.left + iconRect.width / 2 - 230, // Centrar el popover
      });
    }
    onToggle(); // Llamamos la función para cambiar el estado en el componente padre
  };

  // Cerrar el popover si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        onToggle(); // Cierra el popover
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggle]);

  const handleLogout = () => {
    sessionStorage.removeItem('user_session')    
    navigate('/')
    window.location.reload()
  };

  return (
    <div className="relative">
      {/* Icono de notificaciones */}
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${
          isOpen ? "bg-blue-100" : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={togglePopover}
        ref={iconRef}
      >
        <img
          src={user.photo_url}
          alt="Profile"
          className={`w-11 h-11 rounded-full object-cover ${
            isOpen
              ? "border-primary border-2"
              : "text-gray-600 hover:border-primary border-2"
          }`}
        />
      </span>

      {/* Popover */}
      {isOpen && (
        <div
          className="fixed bg-white shadow-[0_6px_24px_-12px_rgba(0,0,0,0.8)] rounded z-[1300] w-64"
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
          }}
          ref={popoverRef} // Asignamos la referencia al popover
        >
          <div className="bg-gray-100 px-6 py-3 rounded-t">
            <h3 className="text-gray-800 text-base font-extrabold">Opciones</h3>
          </div>
          <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] px-6 py-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto">
            <div class="space-y-4">
              <div
                class="flex flex-wrap items-center cursor-pointer shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] rounded-lg w-full p-4 hover:bg-primary"
                onClick={handleLogout}
              >
                <Logout className="text-gray-600 mr-2" /> {/* Ícono añadido */}
                <div class="ml-4 flex-1">
                  <p class="text-sm text-gray-800 font-semibold">
                    Cerrar sesion
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center cursor-pointer shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] rounded-lg w-full p-4">
                <div class="ml-4 flex-1">
                  <p class="text-sm text-gray-800 font-semibold">Perfil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPopover;
