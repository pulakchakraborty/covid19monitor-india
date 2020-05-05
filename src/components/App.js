import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

import '../styles/App.scss';

mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;

const App = () => {
    const mapboxElRef = useRef(null); // DOM element to render map

    // Initialize the map
    useEffect(() => {
        // You can store the map instance with useRef too
        const map = new mapboxgl.Map({
            container: mapboxElRef.current,
            style: "mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k",
            center: [16, 27], // initial geo location
            zoom: 2 // initial zoom
        });

        // Add navigation controls to the top right of the canvas
        map.addControl(new mapboxgl.NavigationControl());
    }, []);

    return(
        <div className="App">
            <div className="mapContainer">
                {/* Assigned Mapbox container */}
                <div className="mapBox" ref={mapboxElRef} />
            </div>
        </div>
    );
}

export default App;
