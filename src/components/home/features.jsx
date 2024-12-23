import React from 'react';
import SearchPersonImage from '../../../public/search-person-black.svg';
import SearchCarImage from '../../../public/search-car-black.svg';
import TrackingPersonImage from '../../../public/tracking-person-black.svg';
import RealTimeImage from '../../../public/real-time-black.svg';
import ReportAttendanceImage from '../../../public/report-attendance-black.svg';
import ReportInfractionsImage from '../../../public/report-infraction-black.svg'; // Nueva imagen (debes agregarla)

function features() {
  return (
    <div class="max-w-7xl max-md:max-w-xl mx-auto font-[sans-serif] my-4">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-gray-800 text-4xl font-extrabold text-center mb-6">Funciones Exclusivas</h2>
        <p class="text-gray-600 text-base">
          Descubre las herramientas que transformarán la gestión de infracciones y optimizarán tus operaciones. Conecta campo y plataforma para una supervisión eficiente y segura.
        </p>
      </div>

      <div class="mt-6">
        <div class="grid md:grid-cols-2 items-center gap-16">
          {/* Nuevo elemento: Reporte de Infracciones */}
          <div>
            <img
              src={ReportInfractionsImage}
              class="w-full h-72 object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]"
            />
          </div>
          <div>
            <h3 class="text-primary text-2xl font-bold mb-4">Reporte de Infracciones</h3>
            <p class="text-gray-600 text-base">
              Genera reportes detallados de infracciones levantadas, con información clara y estructurada para una mejor toma de decisiones.
            </p>
          </div>

          {/* Elemento: Búsqueda de Usuarios */}
          <div class="max-md:order-1">
            <h3 class="text-primary text-2xl font-bold mb-4">Búsqueda de Usuarios</h3>
            <p class="text-gray-600 text-base">
              Consulta usuarios en la plataforma, accede a sus historiales de infracciones y gestiona su información de manera centralizada.
            </p>
          </div>
          <div>
            <img
              src={SearchPersonImage}
              class="w-full h-72 object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]"
            />
          </div>

          {/* Elemento: Búsqueda de Vehículos */}
          <div>
            <img
              src={SearchCarImage}
              class="w-full h-72 object-fill rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]"
            />
          </div>
          <div class="max-md:order-1">
            <h3 class="text-primary text-2xl font-bold mb-4">Búsqueda de Vehículos</h3>
            <p class="text-gray-600 text-base">
              Localiza vehículos rápidamente y visualiza su historial completo de infracciones para un seguimiento más efectivo.
            </p>
          </div>

          {/* Elemento: Mapa en Tiempo Real */}
          <div class="max-md:order-1">
            <h3 class="text-primary text-2xl font-bold mb-4">Mapa en Tiempo Real</h3>
            <p class="text-gray-600 text-base">
              Visualiza las infracciones levantadas en tiempo real, ubicadas geográficamente en un mapa, para un monitoreo dinámico.
            </p>
          </div>
          <div>
            <img
              src={RealTimeImage}
              class="w-full h-72 object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]"
            />
          </div>

          {/* Elemento: Tracking de Personal */}
          <div>
            <img
              src={TrackingPersonImage}
              class="w-full h-72 object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]"
            />
          </div>
          <div class="max-md:order-1">
            <h3 class="text-primary text-2xl font-bold mb-4">Tracking de Personal</h3>
            <p class="text-gray-600 text-base">
              Supervisa la ubicación del personal en campo en tiempo real para mejorar la coordinación y la eficiencia operativa.
            </p>
          </div>

          {/* Elemento: Reporte de Asistencia */}
          <div class="max-md:order-1">
            <h3 class="text-primary text-2xl font-bold mb-4">Reporte de Asistencia</h3>
            <p class="text-gray-600 text-base">
              Accede a reportes detallados de asistencia del personal en campo para un control más preciso y confiable.
            </p>
          </div>
          <div>
            <img
              src={ReportAttendanceImage}
              class="w-full h-64 object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default features;
