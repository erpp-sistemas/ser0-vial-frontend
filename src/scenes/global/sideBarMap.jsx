import { useState, useEffect } from 'react'

//* ASSETS
import LogoSer0VialImage from "../../../public/logo-ser0-vial.png";
import LogoImageSer0VialImage from "../../../public/logo-image-ser0-vial.png";
import LogoSer0VialDarkImage from "../../../public/logo-ser0-vial-white.png";
import LogoImageSer0VialDarkImage from "../../../public/logo-image-ser0-vial-white.png";

//* ICONS
import * as MUIIcons from "@mui/icons-material";

//* STYLES
import './sidebar/index.css'
import tailwindConfig from '../../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

//* LIBRERIES
import { ChevronRight, ChevronLeft, LocationOn } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Marker } from "mapbox-gl";

//* SERVICE
import { getServicesByPlace, getLayersByPlace } from '../../services/map.service';

//* STATE GLOBAL
import { setLayersActive } from '../../redux/mapSlice';
import { url_geoserver_backend } from '../../config/credentials';




const sideBarMap = ({ isCollapsed, setIsCollapsed }) => {

    const dispatch = useDispatch();
    const place_active = useSelector(state => state.map.place_active);
    const map_active = useSelector(state => state.map.map);
    const features = useSelector((state) => state.map.features_layer);
    const coordinates = useSelector((state) => state.map.coordinates);
    const fullConfig = resolveConfig(tailwindConfig);
    const primaryColor = fullConfig.theme.colors.primary;
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [services, setServices] = useState([]);
    const [serviceIdActive, setServiceIdActive] = useState(0);
    const [serviceNameActive, setServiceNameActive] = useState('');
    const [layers, setLayers] = useState([]);
    const [layerSelected, setLayerSelected] = useState(null);
    const [isLoadingLayer, setIsloadingLayer] = useState(false);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        setIsCollapsed(false);
        const handleThemeChange = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };
        const observer = new MutationObserver(() => handleThemeChange());
        observer.observe(document.documentElement, { attributes: true });
        handleThemeChange();
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        loadDataServiceLayer();
    }, [place_active])

    useEffect(() => {
        if (services.length > 0) {
            services.forEach(service => {
                if (service.service_id === 1) fillMapping(service)
            })
        }
    }, [services]);

    useEffect(() => {
        if (coordinates && coordinates.length > 0 && coordinates[0] !== undefined) {
            if (marker !== null) marker.remove()
            setMarker(new Marker({
                color: primaryColor,
            }).setLngLat(coordinates).addTo(map_active));
        } else {
            if (marker !== null) marker.remove()
        }
    }, [coordinates])

    const toggleSidebar = () => {
        const service = services.filter(ser => ser.service_id === serviceIdActive)[0];
        setIsCollapsed(!isCollapsed);
        setTimeout(() => {
            fillMapping(service);
        }, 200)
    };

    const renderIcon = (iconName) => {
        const IconComponent = MUIIcons[iconName] || LocationOn;
        return <IconComponent />;
    };

    const fillMapping = (service) => {
        const id = document.getElementById(service.service_id);
        if (id) {
            changeColorService(service.service_id);
            setServiceNameActive(service.name_service)
            putLayersByIdServicio(service.service_id)
        }
    }

 
    const loadDataServiceLayer = async () => {
        if (place_active.place_id === undefined) return;
        const services = getServicesByPlace(place_active.place_id);
        const layers = getLayersByPlace(place_active.place_id);
        const promise = await Promise.all([services, layers]);
        //console.log(promise)
        setServices(promise[0]);
        setLayers(promise[1])
    }

    const handleService = (service) => {
        putLayersByIdServicio(service.service_id);
        setServiceNameActive(service.name_service);
        setServiceIdActive(service.service_id);
        changeColorService(service.service_id);
    }

    const changeColorService = (service_id) => {
        const id = document.getElementById(service_id)
        if (id.classList.contains('bg-primary')) return;

        if (!id.classList.contains('bg-primary')) {
            id.classList.toggle('bg-primary');
            services.filter(service => service.service_id !== service_id).forEach(s => {
                document.getElementById(s.service_id).classList.remove('bg-primary')
                document.getElementById(s.service_id).classList.add('bg-gray-200')
            })
        };
    }

    const putLayersByIdServicio = (service_id) => {
        const layers_active = layers.filter(layer => service_id === layer.service_id)
        dispatch(setLayersActive(layers_active));
        layers_active.forEach(layer => document.getElementById(layer.name_layer).style.display = 'block')
        layers.filter(layer => service_id !== layer.service_id).forEach(l => {
            document.getElementById(l.name_layer).style.display = 'none'
        })
    }

    const handleLayer = async (layer) => {
        const { layer_id: layer_id_obj } = layer;
        const layer_id = layer_id_obj.toString();
        const layer_in_map = !!map_active.getLayer(layer_id);
        if (!layer_in_map) {
            setLayerSelected(layer);
            if (!layer.is_large) {
                return await processLoadLayerMap(layer);
            }
            if (layer.is_large) return; //todo mostrar el modal para el layer pesado
        }
        if (layer_in_map) {
            if (map_active.getLayoutProperty(layer_id, 'visibility') === 'visible' || map_active.getLayoutProperty(layer_id, 'visibility') === undefined) {
                map_active.setLayoutProperty(layer_id, 'visibility', 'none')
                map_active.setFilter(layer_id, null)
                changeColorLayer(layer.name_layer, 'bg-gray-200', true)
            } else {
                const find_cluster = handleCheckClusterInMap(layer);
                if (find_cluster) return alert("Desactiva el mapa de calor para apagar este layer");
                map_active.setLayoutProperty(layer_id, 'visibility', 'visible')
                changeColorLayer(layer.name_layer, 'bg-green-200')
            }
        }
    }

    const processLoadLayerMap = async (layer, dates_filter = null) => {
        setIsloadingLayer(true);
        await loadLayerInMap(layer, dates_filter);
        changeColorLayer(layer.name_layer, 'bg-green-200');
    }

    const loadLayerInMap = async (layer, dates_filter = null) => {
        try {
            if (layer.url !== '') await generateLayer(layer, dates_filter);
        } catch (error) {
            console.error(error)
        }
    }

    const generateLayer = async (layer, dates_filter = null) => {
        const { layer_id, type, url, name_layer, color, opacity } = layer;
        const data = await loadFeaturesLayer(url, dates_filter);
        map_active.addSource(layer.name_layer, { type: 'geojson', data: data })
        map_active.addLayer({
            "id": layer_id.toString(),
            "type": type === 'punto' ? "circle" : "fill",
            "source": name_layer,
            "layout": {},
            "minzoom": type === 'punto' ? 10 : 6,
            "maxzoom": type === 'punto' ? 24 : 18,
            "paint": type === 'punto' ?
                {
                    'circle-radius': ['/', 7.142857142857142, 2], 'circle-color': color, 'circle-opacity': Number(opacity), 'circle-stroke-width': 1, 'circle-stroke-color': '#232323'
                } :
                {
                    'fill-color': layer.color,
                    'fill-outline-color': 'rgb(0,0,0)',
                    'fill-opacity': Number(layer.opacity),
                }
        })
        if (type === 'punto') map_active.setLayoutProperty(layer.layer_id.toString(), 'visibility', 'visible');
        setIsloadingLayer(false);
    }


    const changeColorLayer = (name_layer, color, remove = false) => {
        const id = document.getElementById(name_layer);
        if (remove) {
            id.classList.remove('bg-green-200');
        }
        id.classList.toggle(color);
    }

    const loadFeaturesLayer = async (url, dates_filter = null) => {
        let cqlFilter = null;
        let url_request = null;
        let response = null;
        if (dates_filter) {
            const { periodoInicial, periodoFinal } = dates_filter;
            cqlFilter = `fecha_filter BETWEEN '${periodoInicial}' AND '${periodoFinal}'`;
            url_request = `${url}&cql_filter=${encodeURIComponent(cqlFilter)}`;
            response = await fetch(url_request);
        }
        if (!dates_filter) response = await axios.post(url_geoserver_backend, { url });

        const data = await response.data;
        return data;
    }

    const handleCheckClusterInMap = (layer) => {
        const sources = map_active.getStyle().sources;
        const name_cluster = `cluster-${layer.name_layer}`;
        const find_cluster = Object.keys(sources).find(sourceID => sourceID === name_cluster);
        return find_cluster;
    }

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
                        <div className="py-1 rounded-t-md flex items-center px-3 bg-primary text-white font-semibold"  >
                            <h1 className="text-base">Servicios</h1>
                        </div>
                        <div className='card-background py-2' >
                            <div className="flex justify-evenly flex-wrap p-4">
                                {services.length > 0 && services.map((service) => (
                                    <div key={service.service_id} id={service.service_id} className="bg-gray-200 text-gray-950 p-2 rounded-lg"
                                        onClick={() => handleService(service)}
                                    >
                                        {renderIcon(service.icon_service)}
                                    </div>
                                ))}
                            </div>
                            <div className='bg-gray-50 p-2 text-center mt-2 rounded-md'>
                                <h3 className='text-base font-semibold text-primary'>{serviceNameActive.toUpperCase()}</h3>
                            </div>
                            {isLoadingLayer && <Alert sx={{ marginTop: '5px' }} severity="warning">Cargando capa...</Alert>}
                        </div>
                    </div>

                    {/* LAYERS */}
                    <div className="w-full max-h-[200px] mt-4" >
                        <div className="py-1 rounded-t-md flex items-center px-3 bg-primary text-white font-semibold"  >
                            <h1 className="text-base">Layers</h1>
                        </div>
                        <div className='card-background py-2 flex flex-col items-center'>
                            {layers.length > 0 && layers.map((layer) => (
                                <button key={layer.layer_id} id={layer.name_layer} className="w-[90%] bg-gray-300 my-1 py-2 rounded-md text-gray-900 text-sm px-1" onClick={() => handleLayer(layer)} >
                                    {layer.name_layer.charAt(0).toUpperCase() + layer.name_layer.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* INFORMACION */}
                    <div className="w-full mt-4">
                        <div className="py-1 rounded-t-md flex items-center px-3 bg-primary text-white font-semibold"  >
                            <h1 className="text-base">Información</h1>
                        </div>
                        <div className='card-background py-2 flex flex-col gap-3 items-center'>

                            {Object.keys(features).length > 0 && (features.cuenta || features.municipio || features.custom_id) ? Object.keys(features).map((f, index) => (
                                <>
                                    {f !== 'fecha_filter' && (
                                        <button key={index} className='bg-gray-200 text-gray-950 w-[90%]'>
                                            {`${f.replaceAll('_', ' ')} : ${features[f]}`}
                                        </button>
                                    )}
                                </>
                            )) : null}
                        </div>
                    </div>

                </div>
            )}


        </nav>
    )
}

export default sideBarMap


