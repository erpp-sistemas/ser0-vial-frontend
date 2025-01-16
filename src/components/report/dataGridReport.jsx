import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DisabledByDefault, Download, Error } from "@mui/icons-material";
import * as ExcelJS from "exceljs";
import Loading from "../../components/modals/loading";
import ImageViewer from "../viewer/imageViewer"; // Asegúrate de que este componente está importado correctamente.

const DataGridReport = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [openImageViewer, setOpenImageViewer] = useState(false); // Estado para controlar la visibilidad del visor de imágenes

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  // Generar columnas dinámicamente
  const columns = Object.keys(data[0])
    .filter((key) => key !== "photos")
    .map((key) => ({
      field: key,
      headerName: key.replace(/_/g, " ").toUpperCase(),
      flex: 1,
      minWidth: Math.max(100, key.length * 12), // Evitar que las columnas sean demasiado pequeñas
    }));

  // Agregar columna para las fotos
  columns.push({
    field: "photos",
    headerName: "FOTOS",
    flex: 2,
    minWidth: 150,
    renderCell: (params) => {
      const photos = params.value; // Array de fotos
      if (!photos || photos.length === 0) {
        return (
          <div className="font-[sans-serif] flex flex-col gap-4 items-center mx-auto justify-center h-full">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-1.5 tracking-wide rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 mr-2 fill-current"
                  viewBox="0 0 24 24"
                >
                  <g fillRule="evenodd" clipRule="evenodd">
                    <path
                      d="M8.651 2.5c-2.52 0-4.15 1.729-4.15 4.404v8.146c0 2.676 1.63 4.404 4.15 4.404h8.647c2.525 0 4.156-1.728 4.156-4.404V6.904c.001-1.363-.415-2.501-1.203-3.29-.728-.729-1.747-1.114-2.949-1.114zm8.647 18.454H8.65C5.27 20.954 3 18.581 3 15.05V6.904C3 3.373 5.27 1 8.65 1h8.651c1.608 0 2.995.537 4.01 1.554 1.061 1.062 1.643 2.607 1.641 4.351v8.145c0 3.531-2.273 5.904-5.656 5.904z"
                    />
                    <path
                      d="M9.856 6.69a1.096 1.096 0 1 0 .003 2.192 1.096 1.096 0 0 0-.003-2.193zm.001 3.69a2.598 2.598 0 0 1-2.596-2.595A2.598 2.598 0 0 1 9.857 5.19a2.6 2.6 0 0 1 2.597 2.595 2.599 2.599 0 0 1-2.597 2.596zM4.75 19.111a.75.75 0 0 1-.653-1.117c.06-.108 1.494-2.645 3.073-3.945 1.252-1.03 2.6-.464 3.686-.007.64.27 1.243.523 1.823.523.532 0 1.2-.94 1.79-1.769.818-1.156 1.748-2.464 3.11-2.464 2.17 0 4.043 1.936 5.05 2.976l.116.12a.751.751 0 0 1-.016 1.061.748.748 0 0 1-1.06-.016l-.118-.122c-.852-.88-2.438-2.519-3.972-2.519-.588 0-1.278.973-1.889 1.832-.838 1.18-1.705 2.401-3.01 2.401-.884 0-1.693-.34-2.406-.64-1.134-.479-1.648-.632-2.15-.218-1.365 1.124-2.707 3.498-2.72 3.521a.749.749 0 0 1-.655.383z"
                    />
                  </g>
                </svg>
                <span className="ml-1 text-xs">Sin fotos</span> {/* Leyenda a la derecha */}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          {photos.slice(0, 3).map((photo, index) => (
            <img
              key={index}
              src={photo.url} // Ajusta la propiedad según tu estructura de datos
              alt={`Foto ${index + 1}`}
              className="w-12 h-12 object-cover rounded-lg border border-gray-300 cursor-pointer"
              onClick={() => {
                setSelectedPhotos([photo]); // Establecer solo la foto seleccionada
                setOpenImageViewer(true); // Abrir el modal de imagen
              }}
            />
          ))}
          {photos.length > 3 && (
            <span style={{ color: "#888", fontSize: "12px" }}>
              +{photos.length - 3} más
            </span>
          )}
        </div>
      );
    },
  });

  // Función para manejar la descarga
  const handleDownload = async () => {
    try {
      setShowModalLoading(true);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Registros Encontrados");

      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);

      if (filteredUsers.length > 0) {
        filteredUsers.forEach((row) => {
          const values = headers.map((header) => row[header]);
          worksheet.addRow(values);
        });
      } else {
        data.forEach((row) => {
          const values = headers.map((header) => row[header]);
          worksheet.addRow(values);
        });
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reportes" + ".xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      setShowModalLoading(false);
    } catch (error) {
      setShowModalLoading(false);
      console.error("Error:", error);
      return null;
    } finally {
      setShowModalLoading(false); // Asegúrate de que siempre se oculte el loading
    }
  };

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredUsers(data);
      setNoResults(false);
      return;
    }

    const matchingUsers = data.filter((data_grid) => {
      return Object.values(data_grid).some(
        (fieldValue) =>
          fieldValue && fieldValue.toString().toLowerCase().includes(value)
      );
    });

    if (matchingUsers.length === 0) {
      setFilteredUsers([]);
      setNoResults(true);
    } else {
      setFilteredUsers(matchingUsers);
      setNoResults(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      {/* Contenedor para el input de búsqueda y el botón */}
      <Loading open={showModalLoading} />
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-4">
          <div>
            <input
              type="text"
              placeholder="Ingresa tu busqueda..."
              className="px-4 py-1.5 text-sm text-gray-900 rounded-md bg-white border border-gray-400 w-full outline-blue-500"
              value={searchTerm}
              onChange={handleChange}
            />
            {noResults && (
              <p className="text-xs text-red-500 flex items-center mt-2">
                <Error />
                No se encontraron resultados
              </p>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex items-end">
            <button
              type="button"
              className="w-full px-2 py-1 flex items-center justify-center rounded-lg text-gray-100 text-xs tracking-wider font-medium border-none outline-none bg-primary hover:bg-gray-600 active:primary"
              onClick={handleDownload}
            >
              <span className="border-r border-gray-100 font-semibold pr-2">
                Descargar
              </span>
              <Download className="ml-2 inline text-xs" />
            </button>
          </div>
        </div>
        {/* Las 6 columnas restantes se quedan vacías */}
        <div className="col-span-6"></div>
      </div>

      {/* DataGrid */}
      <div
        style={{
          height: "auto",
          maxHeight: 800,
          minHeight: 400,
          width: "100%",
        }}
      >
        <DataGrid
          rows={filteredUsers.length > 0 || searchTerm ? filteredUsers : data}
          columns={columns}
          getRowId={(row) => row.custom_id}
          disableSelectionOnClick
          className="text-sm
          [&_.MuiDataGrid-columnHeader]:bg-gray-100 
          [&_.MuiDataGrid-columnHeader]:dark:bg-gray-900 
          [&_.MuiDataGrid-columnHeader]:text-black 
          [&_.MuiDataGrid-columnHeader]:dark:text-white
          [&_.MuiDataGrid-cell]:bg-white 
          [&_.MuiDataGrid-cell]:dark:bg-gray-800 
          [&_.MuiDataGrid-cell]:text-gray-800 
          [&_.MuiDataGrid-cell]:dark:text-gray-200
          [&_.MuiDataGrid-footerContainer]:bg-white 
          [&_.MuiDataGrid-footerContainer]:dark:bg-gray-800 
          [&_.MuiDataGrid-footerContainer]:text-gray-800 
          [&_.MuiDataGrid-footerContainer]:dark:text-gray-200
          [&_.MuiTablePagination-root]:bg-white 
          [&_.MuiTablePagination-root]:dark:bg-gray-800 
          [&_.MuiTablePagination-root]:text-gray-800 
          [&_.MuiTablePagination-root]:dark:text-gray-200
          [&_.MuiSvgIcon-root]:bg-white 
          [&_.MuiSvgIcon-root]:dark:bg-gray-800 
          [&_.MuiSvgIcon-root]:text-gray-800 
          [&_.MuiSvgIcon-root]:dark:text-gray-200"
        />
      </div>

      {/* Modal de visualización de imágenes */}
      {openImageViewer && (
        <ImageViewer
          photos={selectedPhotos} // Asegúrate de pasar las fotos seleccionadas
          open={openImageViewer}
          onClose={() => setOpenImageViewer(false)} // Cerrar el modal
        />
      )}
    </div>
  );
};

export default DataGridReport;
