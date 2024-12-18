import React from "react";
import AppMobileImage from "../../../public/app-mobile-black.svg";

function appFeature() {
  return (
    <div class="grid md:grid-cols-3 rounded-lg gap-6 min-h-[164px] py-8 p-16 bg-gradient-to-t from-blue-500 to-gray-sans overflow-hidden">
      <div class="md:col-span-2">
        <h3 class="font-extrabold text-5xl leading-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-l from-blue-500 via-blue-500 to-blue-500">
            ser0 Vial
          </span>
        </h3>
        <h6 class="text-lg text-gray-800 mt-4">
          Gestiona, reporta y consulta infracciones en tiempo real desde tu
          dispositivo móvil. Optimiza el control y agiliza tus operaciones,
          estés donde estés.
        </h6>

        <button
          type="button"
          class="py-3 px-6 text-sm font-bold bg-white text-blue-500 hover:bg-slate-100 rounded-md mt-8"
        >
          Solicita la instalación de la app
        </button>
      </div>

      <div class="relative max-md:hidden">
        <img
          src={AppMobileImage}
          alt="Banner Image"
          class="w-64 h-64 right-4 top-[-13px] md:absolute object-contained"
        />
      </div>
    </div>

    // <div class="bg-gray-50 font-[sans-serif] relative max-w-7xl shadow-lg shadow-[#e9d9f3] mx-auto rounded overflow-hidden">
    //   <div class="grid sm:grid-cols-2 max-sm:gap-6">
    //     <div class="text-center p-6 flex flex-col justify-center items-center">
    //       <h3 class="font-extrabold text-5xl text-blue-500 leading-tight"><span class="text-gray-800">ser0</span> Vial</h3>
    //       <h6 class="text-lg text-gray-800 mt-4">Gestiona, reporta y consulta infracciones en tiempo real desde tu dispositivo móvil. Optimiza el control y agiliza tus operaciones, estés donde estés</h6>

    //       <button type="button" class="bg-blue-500 hover:bg-blue-600 text-white tracking-wide font-semibold text-sm py-3 px-6 rounded-xl mt-8">
    //         Solicita la instalacion de la app
    //       </button>
    //     </div>

    //     <div class="flex justify-end items-center p-2 bg-gradient-to-b from-blue-700 to-blue-400 rounded-bl-[230px] w-full h-full">
    //       <div class="h-72 w-72 rounded-full bg-gradient-to-tr from-blue-800 to-blue-200 p-5">
    //         <img src="https://readymadeui.com/team-image.webp" class="w-full h-full rounded-full object-cover border-8 border-white" alt="img" />
    //       </div>
    //     </div>
    //   </div>

    //   <div class="absolute -top-[50px] -left-[50px] w-28 h-28 rounded-full bg-blue-800 opacity-40 shadow-lg"></div>
    //   <div class="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-blue-700 opacity-40 shadow-lg"></div>
    // </div>
  );
}

export default appFeature;
