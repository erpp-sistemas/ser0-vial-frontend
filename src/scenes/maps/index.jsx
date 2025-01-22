import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const index = () => {

    const user = useSelector((state) => state.user);
    const navigation = useNavigate();
    const [placesUser, setPlacesUser] = useState([])

    useEffect(() => {
        const places_user = user.place_user;
        const places = places_user.map(pu => pu);
        setPlacesUser(places.map(p => p.place));
    }, [])

    return (
        <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">

                {placesUser.length > 0 && placesUser.map(place => (
                    <div key={place.place_id} class="rounded overflow-hidden shadow-lg" onClick={() => navigation(`/map/${place.place_id}`)}>
                        <div class="relative">
                            <a href="#">
                                <img class="w-full"
                                    src={place.logo}
                                    alt="Sunset in the mountains" />
                                <div
                                    class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                </div>
                            </a>
                            <div
                                class="absolute bottom-0 left-0 bg-primary px-4 py-2 text-white text-sm">
                                Mapa
                            </div>
                        </div>
                        <div class="px-6 py-4">
                            <p class="text-base font-semibold inline-block hover:text-primary transition duration-500 ease-in-out">{place.name}
                            </p>
                            <p class="text-gray-500 text-sm">
                                Sistema de información geográfica
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default index