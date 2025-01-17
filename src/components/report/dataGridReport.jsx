import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Block, Download, Error } from "@mui/icons-material";
import * as ExcelJS from "exceljs";
import Loading from "../../components/modals/loading";
import ImageViewer from "../viewer/imageViewer";
import { useSelector } from "react-redux";

const DataGridReport = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [openImageViewer, setOpenImageViewer] = useState(false); // Estado para controlar la visibilidad del visor de imágenes
  const [themeColor, setThemeColor] = useState("");
  const theme_color = useSelector(
    (state) => state.user.theme_color || "4F4F4F"
  );

  // Sincronizar el estado local `themeColor` con Redux
  useEffect(() => {
    setThemeColor(theme_color);
  }, [theme_color]);

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  // Obtener los diferentes tipos de fotos y crear columnas dinámicamente
  const photoTypes = new Set();
  data.forEach((row) => {
    if (row.photos) {
      row.photos.forEach((photo) => {
        if (photo.type) {
          photoTypes.add(photo.type);
        }
      });
    }
  });

  // Crear columnas para cada tipo de foto
  const columns = Object.keys(data[0])
    .filter((key) => key !== "photos")
    .map((key) => ({
      field: key,
      headerName: key.replace(/_/g, " ").toUpperCase(),
      flex: 1,
      minWidth: Math.max(100, key.length * 12),
    }));

  // Agregar columnas para cada tipo de foto
  Array.from(photoTypes).forEach((type) => {
    columns.push({
      field: type,
      headerName: type.toUpperCase(),
      flex: 2,
      minWidth: 150,
      renderCell: (params) => {
        const photos = params.row.photos.filter((photo) => photo.type === type);
        if (!photos || photos.length === 0) {
          return (
            <div className="font-[sans-serif] flex flex-col gap-4 items-center mx-auto justify-center h-full">
              <div className="flex justify-center items-center">
                <Block className="text-gray-500" style={{ fontSize: "24px" }} />{" "}
                {/* Icono de bloqueo */}
              </div>
            </div>
          );
        }
        return (
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {photos.slice(0, 3).map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`Foto ${index + 1}`}
                className="w-12 h-12 object-cover rounded-lg border border-gray-300 cursor-pointer"
                onClick={() => {
                  setSelectedPhotos([photo]);
                  setOpenImageViewer(true);
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
  });

  const handleDownload = async () => {
    try {
      setShowModalLoading(true);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Registros Encontrados");

      // Generar encabezados dinámicos
      const baseHeaders = Object.keys(data[0])
      .filter((header) => header !== "photos")
      .map((header) => header.toUpperCase());;
      let dynamicHeaders = [...baseHeaders];
      const maxPhotosPerType = {};

      // Filtrar las filas a exportar
      const rowsToExport = filteredUsers.length > 0 ? filteredUsers : data;

      // Comprobar si hay fotos en alguna de las filas
      let hasPhotos = false;

      // Determinar cuántas fotos hay por tipo para cada fila
      for (const row of rowsToExport) {
        if (row.photos) {
          hasPhotos = true;
          for (const photoType of photoTypes) {
            const count = row.photos.filter(
              (photo) => photo.type === photoType
            ).length;
            maxPhotosPerType[photoType] = Math.max(
              maxPhotosPerType[photoType] || 0,
              count
            );
          }
        }
      }

      // Si hay fotos, agregamos los encabezados dinámicos para cada tipo de foto
      if (hasPhotos) {
        for (const photoType of photoTypes) {
          const photoCount = maxPhotosPerType[photoType] || 0;
          if (photoCount > 0) {
            for (let i = 1; i <= photoCount; i++) {
              dynamicHeaders.push(`FOTO DE ${photoType.toUpperCase()} ${i}`);
            }
          }
        }

        /// Aplicar estilo a los encabezados
        const headerRow = worksheet.addRow(dynamicHeaders);
        headerRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: themeColor.replace("#", "") },
          };
          cell.font = {
            color: { argb: "FFFFFF" }, // Letra blanca
            bold: true,
          };
          cell.alignment = { horizontal: "center", vertical: "middle" }; // Centrado
        });

        // Procesar filas
        for (const [rowIndex, row] of rowsToExport.entries()) {
          const rowValues = dynamicHeaders.map((header) =>
            baseHeaders.includes(header) ? row[header.toLowerCase()] : null
          );
          const excelRow = worksheet.addRow(rowValues);

          // Ajustar altura de fila para imágenes
          worksheet.getRow(rowIndex + 2).height = 75;

          if (row.photos) {
            const photoColumns = {};

            for (const photo of row.photos) {
              // Encontrar la siguiente columna disponible para este tipo de foto
              const photoHeaderBase = dynamicHeaders.filter((header) =>
                header.startsWith(`FOTO DE ${photo.type.toUpperCase()}`)
              );
              let colIndex = -1;

              for (let i = 0; i < photoHeaderBase.length; i++) {
                if (!photoColumns[photoHeaderBase[i]]) {
                  photoColumns[photoHeaderBase[i]] = true;
                  colIndex = dynamicHeaders.indexOf(photoHeaderBase[i]) + 1; // Índice de columna en Excel
                  break;
                }
              }

              if (colIndex !== -1) {
                const base64 = await urlToBase64(photo.url);

                const imageId = workbook.addImage({
                  base64: base64,
                  extension: "jpeg",
                });

                worksheet.addImage(imageId, {
                  tl: { col: colIndex - 1, row: rowIndex + 1 },
                  ext: { width: 75, height: 75 },
                });

                // Ajustar ancho de columna
                worksheet.getColumn(colIndex).width = 12;
              }
            }
          }
        }
      } else {
        // Si no hay fotos, solo agregamos las filas sin fotos
        worksheet.addRow(baseHeaders); // Solo encabezados base sin fotos
        // Procesar filas sin fotos
        for (const row of rowsToExport) {
          const rowValues = baseHeaders.map((header) => row[header]);
          worksheet.addRow(rowValues);
        }
      }

      // Ajustar ancho de columnas basado en el contenido o el encabezado
      worksheet.columns = dynamicHeaders.map((header) => {
        const maxLength = Math.max(
          header.length,
          ...rowsToExport.map((row) =>
            row[header.toLowerCase()] ? row[header.toLowerCase()].toString().length : 0
          )
        );
        return { width: maxLength + 2 }; // Añadir un margen
      });

      // Guardar archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reportes.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el archivo Excel:", error);
    } finally {
      setShowModalLoading(false);
    }
  };

  // Función para convertir una URL de imagen a base64
  const urlToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
