import React from "react";
// import AppMobileImage from "../../../public/app-mobile-black.svg";
import AppMobileImage from "../home/appFeatures/appMobileImage";

function appFeature() {
  return (
    <div className="grid md:grid-cols-3 rounded-lg gap-6 min-h-[164px] py-8 p-16 bg-gradient-to-t from-primary to-gray-sans overflow-hidden">
      <div className="md:col-span-2">
        <h3 className="font-extrabold text-5xl leading-tight">
          <span className="bg-clip-text text-transparent bg-primary">
            ser0 Vial
          </span>
        </h3>
        <h6 className="dark:text-gray-50 text-lg text-gray-800 mt-4">
          Gestiona, reporta y consulta infracciones en tiempo real desde tu
          dispositivo móvil. Optimiza el control y agiliza tus operaciones,
          estés donde estés.
        </h6>

        <button
          type="button"
          className="py-3 px-6 text-sm font-bold bg-white text-primary hover:bg-slate-100 rounded-md mt-8"
        >
          Solicita la instalación de la app
        </button>
      </div>

      <div className="relative max-md:hidden">
        <AppMobileImage />
      </div>
    </div>
  );
}

export default appFeature;
