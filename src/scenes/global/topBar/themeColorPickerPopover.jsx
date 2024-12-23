import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from '../../../redux/userSlice'
import { updateById } from "../../../services/user.service";
import { Palette } from "@mui/icons-material";
import { ChromePicker } from "react-color";

const ThemeColorPickerPopover = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const iconRef = useRef(null);
  const popoverRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [selectedColor, setSelectedColor] = useState("#2196f3"); // Color inicial en hexadecimal

  const user_id = useSelector((state) => state.user.user_id);

  const handleColorChange = (color) => {
    const hexColor = color.hex; // Asegurar que usamos el formato hexadecimal
    setSelectedColor(hexColor);
  };

  const handleApply = () => {
    // Generar el JSON
    const payload = {
      user_id,
      new_data: {
        theme_color: selectedColor,
      },
    };

    updateById(payload)
    .then((res) => {      
      if(res.data.message){
        console.log(res.data.message) 
        dispatch(updateField({ field: "theme_color", value: selectedColor }));        
      }     
      
    })
      .catch((error) => alert(error));

    // Mostrar en consola
    console.log("Payload generado:", JSON.stringify(payload, null, 2));
  };  

  const togglePopover = () => {
    if (!isOpen && iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: iconRect.bottom + 8, // Debajo del icono
        left: iconRect.left + iconRect.width / 2 - 160, // Centrar el popover
      });
    }
    onToggle();
  };

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggle]);

  return (
    <div className="relative">
      {/* Icono de paleta */}
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${
          isOpen ? "bg-blue-100" : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={togglePopover}
        ref={iconRef}
      >
        <Palette
          className={`w-6 h-6 ${
            isOpen ? "text-blue-500" : "text-gray-600 hover:text-blue-500"
          }`}
        />
      </span>

      {/* Popover */}
      {isOpen && (
        <div
          className="fixed bg-white shadow-md rounded z-[1300] w-64"
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
          }}
          ref={popoverRef}
        >
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Selecciona tu color</h3>
            <ChromePicker
              color={selectedColor}
              onChange={handleColorChange}
              disableAlpha={true} // Deshabilita la transparencia para asegurar solo colores hexadecimales
            />
            <button
              onClick={handleApply}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeColorPickerPopover;
