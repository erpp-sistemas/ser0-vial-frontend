import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Download, Error } from "@mui/icons-material";
import * as ExcelJS from "exceljs";
import Loading from "../../components/modals/loading";

const DataGridReport = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);

  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  // Generar columnas dinámicamente
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.replace(/_/g, " ").toUpperCase(),
    flex: 1,
    minWidth: Math.max(100, key.length * 12), // Evitar que las columnas sean demasiado pequeñas
  }));

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
              className="w-full px-2 py-1 flex items-center justify-center rounded-lg text-gray-900 text-xs tracking-wider font-medium border-none outline-none bg-primary hover:bg-gray-600 active:primary"
              onClick={handleDownload}
            >
              <span className="border-r border-gray-900 font-semibold pr-2">
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
    </div>
  );
};

export default DataGridReport;
