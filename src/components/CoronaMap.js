import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

import '../styles/App.scss';
import { mapLayerConfirmed } from '../config/map/mapLayerConfirmed';
import { mapLayerRecovered } from '../config/map/mapLayerRecovered';
import { mapLayerDead } from '../config/map/mapLayerDead';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const CoronaMap = () => {
    const mapboxRef = useRef(null); // DOM element to render map

    // Conversion of fetched data to mapbox geojson formatted data
    const fetcher = url =>
        fetch(url)
            .then(r => r.json())
            .then(data =>
                data.map((point, index) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            point.coordinates.longitude,
                            point.coordinates.latitude
                        ]
                    },
                    properties: {
                        id: index,
                        country: point.country,
                        province: point.province,
                        confirmed: point.stats.confirmed,
                        dead: point.stats.deaths,
                        recovered: point.stats.recovered
                    }
                }))
            );

    // Use swr from Zeit to fetch data from API
    const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", fetcher);

    console.log('Fetched and converetd data: ', data);

    // Initialize the map
    useEffect(() => {
        if (data) {
            // You can store the map instance with useRef too
            const map = new mapboxgl.Map({
                container: mapboxRef.current,
                style: "mapbox://styles/mapbox/dark-v10",   // theme of the map
                center: [76.33643, 22.54930],   // initial geo location
                zoom: 4     // initial zoom
            });

            // Add navigation controls to the top right of the canvas
            map.addControl(new mapboxgl.NavigationControl());
            // Call this method when the map is loaded
            map.once("load", () => {
                // Add our SOURCE
                // with id "points"
                map.addSource("points", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: data
                    }
                });

                // Add first layer: active cases
                map.addLayer({...mapLayerConfirmed});

                // Add second layer - recoveries
                map.addLayer({...mapLayerRecovered});

                // Add third layer - death count
                map.addLayer({...mapLayerDead});
            });
        }
    }, [data]);

    return(
        <div className="mapContainer">
            {/* Assigned Mapbox container */}
            <div className="mapBox" ref={mapboxRef} />
        </div>
    );
}

export default CoronaMap;
