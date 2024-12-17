import React from 'react'
import Hero from '../../components/home/hero'
import Features from '../../components/home/features'
import AppFeature from '../../components/home/appFeature'

function index() {
  return (
    <div>
     <Hero />     
     <Features />
     <AppFeature />
    </div>
  )
}

export default index
// import React from "react";
// import HeroImage from "../../../public/hero.svg";

// function HeroSection() {
//   return (
//     <div className="font-[sans-serif] max-w-6xl max-md:max-w-md mx-auto">
//       <div className="grid md:grid-cols-2 items-center md:gap-10 gap-6">
//         <div className="max-md:order-1 max-md:text-center">
//           <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:!leading-[55px]">
//             <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800">
//               Administra y centraliza
//             </div>
//             <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600">
//               las multas de tránsito
//             </div>
//             <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800">
//               con facilidad
//             </div>
//           </h2>

//           <p className="mt-5 text-base text-gray-500 leading-relaxed">
//             Ser0 Vial conecta tu equipo móvil con una plataforma web para el
//             control, administración y generación de reportes de multas. Todo en
//             un solo lugar.
//           </p>
//         </div>

//         <div className="md:h-[400px] p-2">
//           <img
//             src={HeroImage}
//             className="w-full h-full object-contain rounded-lg"
//             alt="Gestión de Multas"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;
// import { BarChart, Gavel, Smartphone, Notifications } from '@mui/icons-material'
// import React from 'react'

// function index() {
//   return (
//     <div class="max-w-3xl max-md:max-w-xl mx-auto p-4 font-[sans-serif]">
//   <h2 class="text-gray-800 text-3xl font-extrabold text-center">Caracteristicas</h2>
//   <div class="mt-16 space-y-10">
    
//     <div class="grid md:grid-cols-2 gap-14">
//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 mb-6 bg-gray-100 p-2 rounded-md" viewBox="0 0 32 32">
    
//           <path d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"/>
//         </svg>
//         <h3 class="text-gray-800 text-xl font-semibold mb-3">Gestión de Multas</h3>
//         <p class="text-gray-600 text-sm leading-relaxed">Registra, consulta y administra las multas de forma eficiente. Mantén todo bajo control con nuestro sistema.</p>
//       </div>

//       <div class="h-[230px]">
//         <img src="https://readymadeui.com/cardImg.webp" class="w-full h-full object-cover rounded-xl" />
//       </div>
//     </div>

    
//     <div class="grid md:grid-cols-2 gap-14">
//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 mb-6 bg-gray-100 p-2 rounded-md" viewBox="0 0 682.667 682.667">
    
//           <defs>
//             <clipPath id="a" clipPathUnits="userSpaceOnUse">
//               <path d="M0 512h512V0H0Z" />
//             </clipPath>
//           </defs>
//           <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="40" clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
//             <path d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"/>
//             <path d="M178 271.894 233.894 216 334 316.105"/>
//           </g>
//         </svg>
//         <h3 class="text-gray-800 text-xl font-semibold mb-3">Reportes Dinámicos</h3>
//         <p class="text-gray-600 text-sm leading-relaxed">Genera reportes útiles que te permitirán tomar decisiones informadas, aunque aún se encuentren en desarrollo.</p>
//       </div>

//       <div class="h-[230px]">
//         <img src="https://readymadeui.com/hacks-watch.webp" class="w-full h-full object-cover rounded-xl" />
//       </div>
//     </div>

    
//     <div class="grid md:grid-cols-2 gap-14">
//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 mb-6 bg-gray-100 p-2 rounded-md" viewBox="0 0 24 24">
    
//           <g fill-rule="evenodd" clip-rule="evenodd">
//             <path d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 .114-1.153l1.639-1.092-1.117-1.674a.75.75 0 0 1 1.071-.988l3.627 5.439a.75.75 0 0 1 0 1.061z"/>
//             <path d="M9.08 9.48a3.878 3.878 0 0 0 3.88 3.88 3.88 3.88 0 0 0 3.88-3.88 3.878 3.878 0 0 0-3.88-3.88 3.878 3.878 0 0 0-3.88 3.88z"/>
//           </g>
//         </svg>
//         <h3 class="text-gray-800 text-xl font-semibold mb-3">Aplicación Móvil Integrada</h3>
//         <p class="text-gray-600 text-sm leading-relaxed">Las multas se capturan directamente desde la aplicación móvil, facilitando la gestión en tiempo real.</p>
//       </div>

//       <div class="h-[230px]">
//         <img src="https://readymadeui.com/img2.webp" class="w-full h-full object-cover rounded-xl" />
//       </div>
//     </div>

    
//     <div class="grid md:grid-cols-2 gap-14">
//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 mb-6 bg-gray-100 p-2 rounded-md" viewBox="0 0 32 32">
    
//           <path d="M29.92 22.384a1 1 0 0 1-.905-.606c-.474-.953-1.245-2.42-1.745-4.123-2.046-1.47-4.046-2.625-5.902-3.17.043-.026.085-.053.128-.079 2.734-.777 4.97-2.12 6.937-4.274l1.036-.973a1.016 1.016 0 0 1 .908-.173c.413-.08.734-.379.88-.752.314-.81-.115-1.81-.746-2.235-1.11-.694-2.39-1.481-3.748-2.205-.136-.086-.287-.175-.431-.276a8.553 8.553 0 0 0-6.762-.553 10.895 10.895 0 0 0-2.387 7.253c-.595-.053-.63-.128-1.015-.23-.35-.097-.693-.223-1.015-.364-.254-.129-.46-.359-.656-.629-2.716-.19-4.67 1.083-5.51 2.655-.65 1.3-.825 2.828-.474 4.151-.134-.017-.267-.029-.4-.049-.612-.047-.835-.535-.572-.893-.133-.51-.334-.869-.547-.762z"/>
//         </svg>
//         <h3 class="text-gray-800 text-xl font-semibold mb-3">Notificaciones y Alertas</h3>
//         <p class="text-gray-600 text-sm leading-relaxed">Los usuarios recibirán notificaciones y alertas sobre vencimientos y tareas pendientes para mejorar la eficiencia.</p>
//       </div>

//       <div class="h-[230px]">
//         <img src="https://readymadeui.com/alert-notifications.webp" class="w-full h-full object-cover rounded-xl" />
//       </div>
//     </div>
//   </div>
// </div>


//   )
// }

// export default index

