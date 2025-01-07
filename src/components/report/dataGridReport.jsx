import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

const DataGridReport = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  // Obtener el tema para verificar si estamos en modo oscuro o claro
  const theme = useTheme();

  // Generar columnas dinámicamente basado en las claves del primer objeto
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.replace(/_/g, " ").toUpperCase(),
    flex: 1, // Esto es para que las columnas sean flexibles
    minWidth: key.length * 12, // Ajustar el ancho mínimo según la longitud del título
    headerClassName: 'custom-header', // Aplica una clase personalizada (aunque no la usaremos con CSS)
  }));

  // Agregar el campo `id` requerido por el DataGrid
  const rows = data.map((item, index) => ({
    id: index + 1, // Generar un ID basado en el índice
    ...item,
  }));

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-900 border border-gray-200">
      <div className="w-full h-full">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoWidth
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          className="bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-100"
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5', // Fondo dinámico según tema
              color: theme.palette.mode === 'dark' ? 'white' : 'black', // Color del texto según tema
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5', // Fondo dinámico según tema
              color: theme.palette.mode === 'dark' ? 'white' : 'black', // Color del texto en el footer
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid var(--mui-palette-divider)',
              padding: '0.75rem',
            },
          }}
        />
      </div>
    </div>
  );
};

export default DataGridReport;
