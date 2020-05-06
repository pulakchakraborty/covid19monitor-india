import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

import '../styles/App.scss';

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
                        cases: point.stats.confirmed,
                        deaths: point.stats.deaths,
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
                map.addLayer({
                    id: "covid19-cases",
                    source: "points", // this should be the id of the source
                    type: "circle",
                    // paint properties
                    paint: {
                        "circle-opacity": 0.75,
                        "circle-stroke-width": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, 1,
                            200000, 1.8,
                        ],
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, 4,
                            1000, 8,
                            4000, 10,
                            8000, 14,
                            12000, 18,
                            100000, 40,
                            200000, 50
                        ],
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, '#ffffcc',
                            5000, '#ffeda0',
                            10000, '#fed976',
                            25000, '#feb24c',
                            50000, '#fd8d3c',
                            75000, '#fc4e2a',
                            100000, '#e31a1c',
                            200000, '#b10026'
                        ]
                    }
                });



                // Add second layer - recoveries
                map.addLayer({
                    id: "covid19-recovered",
                    source: "points", // this should be the id of the source
                    type: "circle",
                    // paint properties
                    paint: {
                        "circle-opacity": 0.75,
                        /*"circle-stroke-width": [
                            "interpolate",
                            ["linear"],
                            ["get", "recovered"],
                            1, 1,
                            100000, 1.5,
                        ],*/
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["get", "recovered"],
                            1, 4,
                            1000, 8,
                            4000, 10,
                            8000, 14,
                            12000, 18,
                            100000, 40,
                            200000, 50
                        ],
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "recovered"],
                            1, '#f7fcf5',
                            100, '#e5f5e0',
                            500, '#c7e9c0',
                            3000, '#a1d99b',
                            10000, '#74c476',
                            25000, '#41ab5d',
                            50000, '#238b45',
                            100000, '#005a32'
                        ]
                    }
                });

                // Add third layer - death count
                map.addLayer({
                    id: "covid19-deaths",
                    source: "points", // this should be the id of the source
                    type: "circle",
                    // paint properties
                    paint: {
                        "circle-opacity": 1,
                        /*"circle-stroke-width": [
                            "interpolate",
                            ["linear"],
                            ["get", "deaths"],
                            1, 1,
                            100000, 1.5,
                        ],*/
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["get", "deaths"],
                            1, 4,
                            1000, 8,
                            4000, 10,
                            8000, 14,
                            12000, 18,
                            100000, 40,
                            200000, 50
                        ],
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "deaths"],
                            1, '#969696',
                            1000, '#737373',
                            10000, '#525252',
                            50000, '#252525'
                        ]
                    }
                });
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
