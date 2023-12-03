import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const App = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries,
    });

    const [center, setCenter] = useState({
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            // Browser doesn't support Geolocation
            console.error("Error: Your browser doesn't support geolocation.");
        }
    }, []);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    if (!googleMapsApiKey) {
        return <div>Please setup your Google Maps API Key in .env</div>;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
};

export default App;
