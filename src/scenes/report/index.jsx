import React, { useState, useEffect } from "react";
import { Search, Info } from "@mui/icons-material";
import SelectTitle from "../../components/select/selectTitle";
import Loading from "../../components/modals/loading";
import { getFormAll } from "../../services/form.service";

export default function index() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [formId, setFormId] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [formData, setFormData] = useState([]);  

  const handleFormSelect = (form) => {
    setFormId(form ? form.id : "");
    console.log("form seleccionado:", form ? form.id : "");
  };

  const fetchDataForm = () => {    

    setLoadingForm(true);
    setTimeout(() => {
      setLoadingForm(false);
    }, 2000);
  };

  const fetchDataForm2 = () => {
    setLoadingForm(true);
  
    getFormAll()
      .then((response) => {
        const filteredData = response.data.map((form) => ({
          id: form.form_id,
          name: form.name_form,
        }));
        setFormData(filteredData)
        setLoadingForm(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingForm(false);
      });
  };

  const fetchData = () => {
    console.log(formId)
    console.log(fechaInicio)
    console.log(fechaFin)
    setShowModalLoading(true);
    setTimeout(() => {
      setShowModalLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchDataForm2();
  }, []);

  return (
    <div className="p-6 font-[sans-serif]">
      <Loading open={showModalLoading} />
      <h1 className="text-3xl font-bold text-primary mb-4">
        Historial de Reportes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* formulario */}
        <div>
          <label className="text-sm dark:text-gray-50 mb-2 block font-semibold">
            Formulario
          </label>
          <SelectTitle
            data={formData}
            onSelect={handleFormSelect}
            messageDefault="Selecciona un formulario"
            icon={Info}
            isLoading={loadingForm}
          />
        </div>
        {/* Fecha Inicio */}
        <div>
          <label className="text-sm dark:text-gray-50 mb-2 block font-semibold">
            Fecha Inicio
          </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="px-4 py-3 text-black bg-white border border-gray-300 shadow-sm w-full text-sm outline-[#007bff] rounded font-semibold"
          />
        </div>
        {/* Fecha Fin */}
        <div>
          <label className="text-sm dark:text-gray-50 mb-2 block font-semibold">
            Fecha Fin
          </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="px-4 py-3 text-black bg-white border border-gray-300 shadow-sm w-full text-sm outline-[#007bff] rounded font-semibold"
          />
        </div>
        {/*Button*/}
        <div className="flex items-end">
          <button
            type="button"
            className="w-full px-4 py-3 flex items-center justify-center rounded-lg text-white text-sm tracking-wider font-medium border-none outline-none bg-primary hover:bg-gray-600 active:primary"
            onClick={fetchData}
          >
            <span className="border-r border-white font-semibold pr-3">Buscar</span>
            <Search className="ml-3 inline" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Datos encontrados
        </h2>
      </div>
    </div>
  );
}
