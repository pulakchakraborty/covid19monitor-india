import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

import '../styles/App.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const CoronaMap = () => {
    const mapboxElRef = useRef(null); // DOM element to render map

    // Initialize the map
    useEffect(() => {
        // You can store the map instance with useRef too
        const map = new mapboxgl.Map({
            container: mapboxElRef.current,
            style: "mapbox://styles/mapbox/dark-v10",   // theme of the map
            center: [76.33643, 22.54930],   // initial geo location
            zoom: 4     // initial zoom
        });

        // Add navigation controls to the top right of the canvas
        map.addControl(new mapboxgl.NavigationControl());
    }, []);

    return(
        <div className="mapContainer">
            {/* Assigned Mapbox container */}
            <div className="mapBox" ref={mapboxElRef} />
        </div>
    );
}

export default CoronaMap;
