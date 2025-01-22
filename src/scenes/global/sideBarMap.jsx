import { useState, useEffect } from 'react'
import LogoSer0VialImage from "../../../public/logo-ser0-vial.png";
import LogoImageSer0VialImage from "../../../public/logo-image-ser0-vial.png";
import LogoSer0VialDarkImage from "../../../public/logo-ser0-vial-white.png";
import LogoImageSer0VialDarkImage from "../../../public/logo-image-ser0-vial-white.png";
import { ChevronRight, ChevronLeft, LocationOn } from "@mui/icons-material";
import { Alert } from "@mui/material";
import * as MUIIcons from "@mui/icons-material";
import './sidebar/index.css'

const sidebarMap = ({ isCollapsed, setIsCollapsed }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        const observer = new MutationObserver(() => handleThemeChange());
        observer.observe(document.documentElement, { attributes: true });
        handleThemeChange();
        return () => observer.disconnect();
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderIcon = (iconName) => {
        const IconComponent = MUIIcons[iconName] || LocationOn;
        return <IconComponent />;
    };

    return (
        <nav
            className={`dark:bg-dark-background text-light-text dark:text-dark-text bg-white shadow-[0_2px_10px_rgba(107,114,128,1)] h-screen fixed top-0 left-0 py-6 px-4 font-[sans-serif] transition-all ${isCollapsed ? "w-[80px]" : "w-[250px]"}`}
            style={{ zIndex: 10000 }}
        >

            <div className="relative flex justify-center items-center">
                <a href="javascript:void(0)">
                    <img
                        src={
                            isCollapsed
                                ? isDarkMode
                                    ? LogoImageSer0VialDarkImage
                                    : LogoImageSer0VialImage
                                : isDarkMode
                                    ? LogoSer0VialDarkImage
                                    : LogoSer0VialImage
                        }
                        alt="logo"
                        className={`${isCollapsed ? "w-7 h-7" : "w-40"}`}
                    />
                </a>
                <div
                    className="absolute -right-6 top-2 h-6 w-6 p-[6px] cursor-pointer bg-primary flex items-center justify-center rounded-full"
                    onClick={toggleSidebar}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-white" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 text-white" />
                    )}
                </div>
            </div>

            {!isCollapsed && (
                <div className="overflow-auto py-6 h-full">

                    {/* SERVICIOS */}
                    <div className="w-full" >
                        <div className="py-2 rounded-t-md flex items-center px-3 bg-primary text-white font-semibold"  >
                            <h1 className="text-base">Servicios</h1>
                        </div>
                        <div className='card-background py-2' >
                            <div className="flex justify-evenly flex-wrap p-4">
                                <div className="bg-primary p-2 rounded-lg text-white">
                                    {renderIcon('AlignVerticalCenter')}
                                </div>
                                <div className="bg-primary p-2 rounded-lg text-white">
                                    {renderIcon('AlignVerticalCenter')}
                                </div>
                                <div className="bg-primary p-2 rounded-lg text-white">
                                    {renderIcon('AlignVerticalCenter')}
                                </div>
                            </div>
                            <div className='bg-gray-100 text-gray-950 p-2 text-center font-semibold mt-2 rounded-md'>
                                <h3>Cartografía</h3>
                            </div>
                            {/* <Alert sx={{ marginTop: '5px' }} severity="warning">Cargando capa...</Alert> */}
                        </div>
                    </div>

                    {/* LAYERS */}
                    <div className="w-full max-h-[200px] mt-4" >
                        <div className="py-2 rounded-t-md flex items-center px-3 bg-primary text-white font-semibold"  >
                            <h1 className="text-base">Layers</h1>
                        </div>
                        <div className='card-background py-2 flex flex-col items-center'>
                            <button className="w-[90%] bg-gray-300 my-1 py-1 rounded-md text-gray-900 text-sm px-1" >
                                Limite municipal
                            </button>
                            <button className="w-[90%] bg-gray-300 my-1 py-1 rounded-md text-gray-900 text-sm px-1" >
                                Manzana catastral
                            </button>
                            <button className="w-[90%] bg-gray-300 my-1 py-1 rounded-md text-gray-900 text-sm px-1" >
                                Predios catastrales
                            </button>
                        </div>
                    </div>

                    {/* INFORMACION */}
                    <div className="w-full mt-4">
                        <div className="py-2 rounded-t-md flex items-center px-3 bg-primary text-white font-semibold"  >
                            <h1 className="text-base">Información</h1>
                        </div>
                        <div className='card-background py-2 flex flex-col gap-3 items-center'>
                            <button className='bg-gray-200 text-gray-950 w-[90%]'>ID: 175683</button>
                            <button className='bg-gray-200 text-gray-950 w-[90%]'>Nombre: Carlos Mártinez</button>
                        </div>
                    </div>

                </div>
            )}


        </nav>
    )
}

export default sidebarMap


