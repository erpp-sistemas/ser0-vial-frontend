import React, { useState, useRef, useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import ProfileImage from "../../../../public/Profile.svg";

const ProfilePopover = ({ isOpen, onToggle }) => {
  const iconRef = useRef(null);
  const popoverRef = useRef(null);  // Referencia al popover
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const togglePopover = () => {
    if (!isOpen && iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: iconRect.bottom + 8, // Debajo del icono
        left: iconRect.left + iconRect.width / 2 - 160, // Centrar el popover
      });
    }
    onToggle(); // Llamamos la función para cambiar el estado en el componente padre
  };

  // Cerrar el popover si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
        onToggle(); // Cierra el popover
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggle]);

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
        <AccountCircle
          className={`w-6 h-6 ${
            isOpen ? "text-blue-500" : "text-gray-600 hover:text-blue-500"
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
          ref={popoverRef}  // Asignamos la referencia al popover
        >
          <div className="bg-gray-100 px-6 py-3 rounded-t">
            <h3 className="text-gray-800 text-base font-extrabold">
            Perfil
            </h3>
          </div>
          <img
            src={ProfileImage}
            className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePopover;
