import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

import '../styles/App.scss';
import config from '../config';
import { StatesLatLong } from '../config/StatesLatLong';
import { mapLayerConfirmed } from '../config/map/mapLayerConfirmed';
import { mapLayerRecovered } from '../config/map/mapLayerRecovered';
import { mapLayerDead } from '../config/map/mapLayerDead';

// Mapbox CSS
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const CoronaMap = () => {
    const mapboxRef = useRef(null); // DOM element to render map
    const { indiaLatest } = config;

    // Conversion of fetched data to mapbox geojson formatted data
    /*
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
    */
   const fetcher = async (url) =>
        await fetch(url)
            .then(r => r.json())
            .then(response => response.data.regional)
            .then(states =>
                states.map((point, index) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: StatesLatLong.find(state => state.name === point.loc).location
                    },
                    properties: {
                        id: index,
                        country: "India",
                        province: point.loc,
                        confirmed: point.totalConfirmed,
                        dead: point.deaths,
                        recovered: point.discharged
                    }
                }))
            );

    // Use swr from Zeit to fetch data from API
    const { data, error } = useSWR(indiaLatest, fetcher);
    console.log(`data: ${data}`);

    // Initialize the map
    useEffect(() => {
        if (data) {
            console.log(`data: ${data}`);
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

                // Create a mapbox popup
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                // Variable to hold the active country/province on hover
                let lastId;

                // Mouse move event
                map.on("mousemove", "covid19-cases", e => {
                    // Get the id from the properties
                    const id = e.features[0].properties.id;

                    // Only if the id are different we process the tooltip
                    if (id !== lastId) {
                    lastId = id;

                    map.getCanvas().style.cursor = "pointer";

                    const { confirmed, dead, recovered, country, province } = e.features[0].properties;
                    const coordinates = e.features[0].geometry.coordinates.slice();

                    // Collect data for the tooltip
                    const countryISO =
                        lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;
                    const provinceHTML =
                        province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";
                    const mortalityRate = ((dead / confirmed) * 100).toFixed(2);
                    const countryFlagHTML = Boolean(countryISO)
                        ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
                        : "";

                    const HTML = `<p><b>${country}</b>${countryFlagHTML}</p>
                                ${provinceHTML}
                                <p>Confirmed: ${confirmed}</p>
                                <p>Recovered: ${recovered}</p>
                                <p>Dead: ${dead}</p>
                                <p>Mortality Rate: ${mortalityRate}%</p>
                                `;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popup
                        .setLngLat(coordinates)
                        .setHTML(HTML)
                        .addTo(map);
                    }
                });

                // Mouse leave event
                map.on("mouseleave", "covid19-cases", function() {
                    // Reset the last Id
                    lastId = undefined;
                    map.getCanvas().style.cursor = "";
                    popup.remove();
                });
            });
        }

        if (error) {
            // In case of error while fetching data from API only load the map
            const map = new mapboxgl.Map({
                container: mapboxRef.current,
                style: "mapbox://styles/mapbox/dark-v10",   // theme of the map
                center: [76.33643, 22.54930],   // initial geo location
                zoom: 4     // initial zoom
            });
            console.log(`error: ${error}`);
            // Add navigation controls to the top right of the canvas
            map.addControl(new mapboxgl.NavigationControl());
        }
    }, [data, error]);

    return(
        <div className="mapContainer">
            {/* Assigned Mapbox container */}
            <div className="mapBox" ref={mapboxRef} />
        </div>
    );
}

export default CoronaMap;
