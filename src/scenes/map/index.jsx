import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMap, setFeatures, setCoordinates } from '../../redux/mapSlice';
import { useParams } from 'react-router-dom';
import { Map } from "mapbox-gl";
import { setPlaceActive } from '../../redux/mapSlice';

const stylesMap = {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    position: 'fixed',
    top: '64px',
    left: 0,
}

const index = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { place_id } = useParams();

    const mapDiv = useRef(null);
    const [place, setPlace] = useState([])

    useEffect(() => {
        const places_user = user.place_user;
        const places = places_user.map(pu => pu);
        const place_active = places.filter(p => p.place_id === Number(place_id))[0].place;
        setPlace(place_active);
        dispatch(setPlaceActive(place_active));
        generateMap(place_active);
    }, [])

    const generateMap = (place_active) => {
        const { latitude, longitude } = place_active;
        const map = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [Number(longitude), Number(latitude)],
            zoom: 12
        });
        dispatch(setMap(map));

        map.on('click', function (e) {
            let features = map.queryRenderedFeatures(e.point, { layers: map.getStyle().layers.map(layer => layer.id.toString()) });            
            if (features.length) {
                features = removeDuplicates(features);
                if (features[0].id === undefined && !features[0].source.includes('mapbox') && !features[0].source.includes('road') && !features[0].source.includes('composite')) {
                    dispatch(setFeatures(features[0].properties))
                    if (features[0].geometry.type === 'Polygon') {
                        let coordenadasArray = [];
                        let latitud = features[0].properties.latitud;
                        let longitud = features[0].properties.longitud;
                        coordenadasArray.push(longitud);
                        coordenadasArray.push(latitud);
                        dispatch(setCoordinates(coordenadasArray))
                    } else if (features[0].geometry.type === 'Point') {
                        let coordenadas = features[0].geometry.coordinates;
                        dispatch(setCoordinates(coordenadas))
                    }
                } else {
                    dispatch(setFeatures([]))
                    dispatch(setCoordinates({}))
                }
            }
        });
    }

    const removeDuplicates = (array) => {
        var hash = {}
        let arrayTemp = array.filter(function (current) {
            var exists = !hash[current.properties.cuenta]
            hash[current.properties.id_cuenta] = true
            return exists
        })
        return arrayTemp
    }


    return (
        <div ref={mapDiv} style={stylesMap}>

        </div>
    )
}

export default index