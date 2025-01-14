import React, { useState, useEffect } from "react";
import { Search, Info } from "@mui/icons-material";
import SelectTitle from "../../components/select/selectTitle";
import Loading from "../../components/modals/loading";
import TailwindAlert from "../../components/tailwindAlert.jsx";
import { getFormAll } from "../../services/form.service";
import { getByDates } from "../../services/register.service.js";
import DataGridReport from "../../components/report/dataGridReport.jsx";
import { useSelector } from "react-redux";

export default function index() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [formId, setFormId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingPlace, setLoadingPlace] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [placeData, setPlaceData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [resultData, setResultData] = useState([]);

  const user = useSelector((state) => state.user);

  const handleFormSelect = (form) => {
    setFormId(form ? form.id : "");
  };

  const handlePlaceSelect = (place) => {
    setPlaceId(place ? place.id : "");
  };

  const fetchDataPlace = () => {
    setLoadingPlace(true); // Indicar inicio de carga

    try {
      const activePlaces = user.place_user
        .filter((item) => item.place.active === 1) // Filtrar elementos activos
        .map((item) => ({
          id: item.place.place_id,
          name: item.place.name,
        }));

      setPlaceData(activePlaces);

      if (activePlaces.length > 0) {
        const minId = Math.min(...activePlaces.map((place) => place.id));
        setPlaceId(minId);
      }
    } catch (error) {
      console.error("Error al filtrar los lugares activos:", error);
    } finally {
      setLoadingPlace(false); // Finalizar carga, sea exitoso o con error
    }
  };

  const fetchDataForm = () => {
    setLoadingForm(true);

    getFormAll()
      .then((response) => {
        const filteredData = response.data.map((form) => ({
          id: form.form_id,
          name: form.name_form,
        }));
        setFormData(filteredData);

        if (filteredData.length > 0) {
          const minId = Math.min(...filteredData.map((form) => form.id));
          setFormId(minId);
        }

        setLoadingForm(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingForm(false);
      });
  };

  const fetchData = () => {
    if (!placeId || !formId || !fechaInicio || !fechaFin) {
      setAlertTitle("Atencion");
      setAlertMessage(
        "Por favor selecciona una organizacion, un formulario y completa ambas fechas."
      );
      setAlertType("warning");
      setAlertOpen(true);
      return;
    }

    setShowModalLoading(true);

    getByDates(placeId, formId, fechaInicio, fechaFin)
      .then((register) => {
        const result = homogenizeDataJson(register);
        setResultData(result);
      })
      .catch((error) => {
        setAlertTitle("Error");
        setAlertMessage(error);
        setAlertType("error");
        setAlertOpen(true);
      })
      .finally(() => {
        setShowModalLoading(false); // Aseguramos que el indicador de carga desaparezca al finalizar.
      });
  };

  useEffect(() => {
    fetchDataPlace();
    fetchDataForm();
  }, []);

  const homogenizeDataJson = (data) => {
    // Paso 1: Parseamos data_json y extraemos los campos únicos
    const uniqueFields = new Set();

    data.forEach((item) => {
      const parsedData = JSON.parse(item.data_json);
      Object.keys(parsedData).forEach((key) => uniqueFields.add(key));
    });

    // Convertimos el Set a un arreglo
    const allFields = Array.from(uniqueFields);

    // Paso 2: Homogenizamos los objetos
    const homogenizedData = data.map((item) => {
      const parsedData = JSON.parse(item.data_json);

      // Creamos un objeto homogenizado basado en los campos únicos
      const homogenizedItem = {};
      allFields.forEach((field) => {
        homogenizedItem[field] = parsedData[field] || null; // Asigna null si el campo no existe
      });

      // Formateamos la fecha del registro en UTC
      const registrationDate = new Date(item.registration_date);
      const formattedDate = `${registrationDate
        .getUTCDate()
        .toString()
        .padStart(2, "0")}/${(registrationDate.getUTCMonth() + 1)
        .toString()
        .padStart(
          2,
          "0"
        )}/${registrationDate.getUTCFullYear()}, ${registrationDate
        .getUTCHours()
        .toString()
        .padStart(2, "0")}:${registrationDate
        .getUTCMinutes()
        .toString()
        .padStart(2, "0")}:${registrationDate
        .getUTCSeconds()
        .toString()
        .padStart(2, "0")} ${
        registrationDate.getUTCHours() < 12 ? "a.m." : "p.m."
      }`;

      // Agregamos los campos adicionales del registro original
      return {
        custom_id: item.custom_id,
        fecha: formattedDate,
        registration_date_obj: registrationDate,
        ...homogenizedItem,
        // place_id: item.place_id,
        // form_id: item.form_id,
        // latitude: item.latitude,
        // longitude: item.longitude,
        // user_id: item.user_id,
      };
    });

    // Paso 3: Ordenamos los datos por fecha y hora en orden descendente
    homogenizedData.sort(
      (a, b) => b.registration_date_obj - a.registration_date_obj
    );

    // Eliminamos el campo temporal usado para ordenamiento
    homogenizedData.forEach((item) => delete item.registration_date_obj);

    return homogenizedData;
  };

  return (
    <div className="p-6 font-[sans-serif]">
      <Loading open={showModalLoading} />
      <TailwindAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
      <h1 className="text-3xl font-bold text-primary mb-4">
        Historial de Reportes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* formulario */}
        <div>
          <label className="text-sm dark:text-gray-50 mb-2 block font-semibold">
            Organizacion
          </label>
          <SelectTitle
            data={placeData}
            onSelect={handlePlaceSelect}
            messageDefault="Selecciona una organizacion"
            icon={Info}
            isLoading={loadingPlace}
          />
        </div>
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
            <span className="border-r border-white font-semibold pr-3">
              Buscar
            </span>
            <Search className="ml-3 inline" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-white mb-2">
          Datos encontrados
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <DataGridReport data={resultData} />
      </div>
    </div>
  );
}
