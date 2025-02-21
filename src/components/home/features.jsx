import React from "react";
import ReportInfractionsImage from "../home/features/reportInfractionsImage";
import SearchPersonImage from "../home/features/searchPersonImage";
import SearchCarImage from "../home/features/searchCarImage";
import RealTimeImage from "../home/features/realTimeImage";
import TrackingPersonImage from "../home/features/trackingPersonImage";
import ReportAttendanceImage from "../home/features/reportAttendanceImage";

function features() {
  return (
    <div className="max-w-7xl max-md:max-w-xl mx-auto font-[sans-serif] my-4">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="dark:text-gray-50 text-gray-800 text-4xl font-extrabold text-center mb-6">
          Funciones Exclusivas
        </h2>
        <p className="dark:text-gray-50 text-gray-600 text-base">
          Descubre las herramientas que transformarán la gestión de infracciones
          y optimizarán tus operaciones. Conecta campo y plataforma para una
          supervisión eficiente y segura.
        </p>
      </div>

      <div className="mt-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          {/* Nuevo elemento: Reporte de Infracciones */}
          <div>
            <ReportInfractionsImage />
          </div>
          <div>
            <h3 className="text-primary text-2xl font-bold mb-4">
              Reporte de Infracciones
            </h3>
            <p className="dark:text-gray-50 text-gray-600 text-base">
              Genera reportes detallados de infracciones levantadas, con
              información clara y estructurada para una mejor toma de
              decisiones.
            </p>
          </div>

          {/* Elemento: Búsqueda de Usuarios */}
          <div className="max-md:order-1">
            <h3 className="text-primary text-2xl font-bold mb-4">
              Búsqueda de Usuarios
            </h3>
            <p className="dark:text-gray-50 text-gray-600 text-base">
              Consulta usuarios en la plataforma, accede a sus historiales de
              infracciones y gestiona su información de manera centralizada.
            </p>
          </div>
          <div>
            <SearchPersonImage />
          </div>

          {/* Elemento: Búsqueda de Vehículos */}
          <div>
            <SearchCarImage />
          </div>
          <div className="max-md:order-1">
            <h3 className="text-primary text-2xl font-bold mb-4">
              Búsqueda de Vehículos
            </h3>
            <p className="dark:text-gray-50 text-gray-600 text-base">
              Localiza vehículos rápidamente y visualiza su historial completo
              de infracciones para un seguimiento más efectivo.
            </p>
          </div>

          {/* Elemento: Mapa en Tiempo Real */}
          <div className="max-md:order-1">
            <h3 className="text-primary text-2xl font-bold mb-4">
              Mapa en Tiempo Real
            </h3>
            <p className="dark:text-gray-50 text-gray-600 text-base">
              Visualiza las infracciones levantadas en tiempo real, ubicadas
              geográficamente en un mapa, para un monitoreo dinámico.
            </p>
          </div>
          <div>
            <RealTimeImage />
          </div>

          {/* Elemento: Tracking de Personal */}
          <div>
            <TrackingPersonImage />
          </div>
          <div className="max-md:order-1">
            <h3 className="text-primary text-2xl font-bold mb-4">
              Tracking de Personal
            </h3>
            <p className="dark:text-gray-50 text-gray-600 text-base">
              Supervisa la ubicación del personal en campo en tiempo real para
              mejorar la coordinación y la eficiencia operativa.
            </p>
          </div>

          {/* Elemento: Reporte de Asistencia */}
          <div className="max-md:order-1">
            <h3 className="text-primary text-2xl font-bold mb-4">
              Reporte de Asistencia
            </h3>
            <p className="dark:text-gray-50 text-gray-600 text-base">
              Accede a reportes detallados de asistencia del personal en campo
              para un control más preciso y confiable.
            </p>
          </div>
          <div>
            <ReportAttendanceImage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default features;
