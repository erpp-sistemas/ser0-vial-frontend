import React, { useState } from "react";
import HeroImage from "../home/hero/heroImage";

function Hero() {
  return (
    <div className="font-[sans-serif] max-w-7xl max-md:max-w-md mx-auto">
      <div className="grid md:grid-cols-2 items-center md:gap-10 gap-6">
        {/* Texto Hero */}
        <div className="max-md:order-1 max-md:text-center">
          <h2 className="text-gray-800 md:text-5xl text-4xl font-extrabold mb-4 md:!leading-[55px]">
            {/* Frases separadas con degradados de 3 colores */}
            <span className="bg-primary text-transparent bg-clip-text block">
              Gestión Integral de Infracciones Viales:
            </span>
            <span className="bg-gradient-to-r from-teal-700 via-teal-400 to-teal-800 text-transparent bg-clip-text block">
              De Campo a Plataforma
            </span>
          </h2>
          <p className="dark:text-gray-50 mt-5 text-base text-gray-500 leading-relaxed">
            ser0 Vial integra la captura de infracciones en campo mediante
            nuestra app móvil con el análisis y supervisión en tiempo real desde
            la plataforma web, optimizando informes, monitoreo de personal y
            geolocalización para una gestión eficiente y segura. ¡Todo desde un
            solo click!
          </p>
        </div>

        {/* Imagen Hero */}
        <div className="md:h-[400px] h-[200px] p-2 rounded text-primary">
          <HeroImage className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
