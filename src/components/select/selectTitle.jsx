import React, { useState, useEffect } from "react";
import Spinner from "../spinner";

function SelectTitle({
  data,
  onSelect,
  messageDefault,
  icon: Icon,
  isLoading,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Efecto para seleccionar el item con el id más pequeño solo al cargar el componente
  useEffect(() => {
    if (data.length > 0 && selectedItem === null) {
      const defaultItem = data.reduce((prev, curr) => (prev.id < curr.id ? prev : curr));
      setSelectedItem(defaultItem); // Establecer el ítem con el id más pequeño
      if (onSelect) {
        onSelect(defaultItem); // Notificar al padre sobre la selección
      }
    }
  }, [data, selectedItem, onSelect]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          className="w-full px-4 py-3 text-black text-xs bg-white border border-gray-300 shadow-sm rounded font-semibold flex items-center justify-between"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          disabled={isLoading} // Deshabilitar el botón mientras carga
        >
          {isLoading ? (
            <div className="flex items-center">
              {/* Spinner */}
              <Spinner />
            </div>
          ) : selectedItem ? (
            <div className="flex items-center h-[22px]">
              <span>{selectedItem.name}</span>
            </div>
          ) : (
            <div className="flex items-center">
              {Icon && <Icon className="w-5 h-5 text-gray-500 mr-2" />}
              <span>{messageDefault}</span>
            </div>
          )}
        </button>
        {dropdownOpen && !isLoading && (
          <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
            <div className="py-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectTitle;
