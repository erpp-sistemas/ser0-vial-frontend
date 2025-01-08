import React from "react";

function DataGridExample({ data, pageSizeOptions = [5, 10, 20, 50, 100], defaultPageSize = 5 }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-sm">No hay datos para mostrar</p>
      </div>
    );
  }

  // Calcular el número de páginas y los datos paginados
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Extraer columnas dinámicamente
  const columns = Object.keys(data[0]);

  return (
    <div>
      <div className="overflow-x-auto font-[sans-serif] border">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead className="whitespace-nowrap bg-gray-100 dark:bg-gray-900 rounded">
            <tr>
              {columns.map((col) => (
                <th key={col} className="p-4 text-left text-sm font-semibold text-black">
                  {col.replace(/_/g, " ").toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {paginatedData.map((row, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="p-4 text-sm text-black">
                      {typeof row[col] === "string" || typeof row[col] === "number" ? (
                        row[col]
                      ) : (
                        <span>--</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={columns.length} className="border-t border-gray-200"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="md:flex m-4">
          <p className="text-sm text-gray-500 flex-1">
            Mostrando {Math.min((currentPage - 1) * pageSize + 1, data.length)} a {Math.min(currentPage * pageSize, data.length)} de {data.length} entradas
          </p>
          <div className="flex items-center max-md:mt-4">
            <p className="text-sm text-gray-500">Mostrar</p>

            <select
              className="text-sm text-gray-500 border border-gray-400 rounded px-1 py-2 mx-4 outline-none"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1); // Resetear a la primera página
              }}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="border flex rounded divide-x-2 border-gray-400 divide-gray-400">
              <button
                type="button"
                className="px-4 py-2 hover:bg-gray-50 text-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <button
                type="button"
                className="px-4 py-2 hover:bg-gray-50 text-sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataGridExample;
