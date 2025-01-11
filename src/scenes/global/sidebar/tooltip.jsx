import React, { useState, useRef, useEffect } from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Manejar el hover sobre el elemento
  const handleMouseEnter = () => {
    if (iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();

      switch (position) {
        case "top":
          setTooltipPosition({
            top: iconRect.top - 40, // Coloca el tooltip arriba del icono
            left: iconRect.left + iconRect.width / 2 - 64, // Centrar el tooltip
          });
          break;
        case "bottom":
          setTooltipPosition({
            top: iconRect.bottom + 8, // Coloca el tooltip debajo del icono
            left: iconRect.left + iconRect.width / 2 - 64, // Centrar el tooltip
          });
          break;
        case "left":
          setTooltipPosition({
            top: iconRect.top + iconRect.height / 2 - 20, // Coloca el tooltip a la izquierda del icono
            left: iconRect.left - 72, // Coloca el tooltip a la izquierda
          });
          break;
        case "right":
          setTooltipPosition({
            top: iconRect.top + iconRect.height / 2 - 20, // Coloca el tooltip a la derecha del icono
            left: iconRect.right + 8, // Coloca el tooltip a la derecha
          });
          break;
        default:
          break;
      }
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Cerrar el tooltip si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* El contenido que activa el tooltip puede ser cualquier cosa que se pase como children */}
      <span
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={iconRef}
      >
        {children} {/* Esto puede ser el icono o cualquier otro contenido */}
      </span>

      {/* Tooltip */}
      {isHovered && (
        <div
          className="fixed font-[sans-serif] dark:bg-gray-900 bg-gray-100 shadow-md rounded-lg w-auto p-2 text-center text-xs text-gray-800 dark:text-gray-100 transition-all duration-200 ease-in-out"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          ref={tooltipRef}
        >
          {text} {/* El texto que aparecerá en el tooltip */}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
