import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Map } from "mapbox-gl";

const stylesMap = {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    position: 'fixed',
    top: '64px',
    left: 0,
}

const index = () => {

    const user = useSelector((state) => state.user);
    const { place_id } = useParams();

    const mapDiv = useRef(null);
    const [place, setPlace] = useState([])

    useEffect(() => {
        const places_user = user.place_user;
        const places = places_user.map(pu => pu);
        const place_active = places.filter(p => p.place_id === Number(place_id))[0].place
        setPlace(place_active)
        generateMap(place_active)
    }, [])

    const generateMap = (place_active) => {
        console.log(place_active)
        const { latitude, longitude } = place_active;
        const map = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [Number(longitude), Number(latitude)],
            zoom: 12
        });
    }

    return (
        <div ref={mapDiv} style={stylesMap}>

        </div>
    )
}

export default index