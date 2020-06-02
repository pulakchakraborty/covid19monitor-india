import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import lookup from 'country-code-lookup';
import styled from 'styled-components';

import { mapLayerConfirmed } from '../config/map/mapLayerConfirmed';
import { mapLayerRecovered } from '../config/map/mapLayerRecovered';
import { mapLayerDead } from '../config/map/mapLayerDead';
import Spinner from './Spinner';

// Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const MapContainer = styled.div`
  width: 100%;
  height: 512px;
  display: grid;

  @media (min-width: 768px) {
    height: 100%;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 512px;
  grid-column: 1;
  grid-row: 1;
  visibility: ${(props) => props.mapVisibility};

  @media (min-width: 768px) {
    height: 100%;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const MapPlaceholder = styled.div`
  background: black;
  justify-content: center;
  opacity: 0.85;
  width: 100%;
  height: 512px;
  display: flex;
  grid-column: 1;
  grid-row: 1;

  @media (min-width: 768px) {
    height: 100%;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;
const RenderLoader = () => (
  <MapPlaceholder>
    <Spinner />
  </MapPlaceholder>
);

const CoronaMap = ({ data }) => {
  const mapboxRef = useRef(null); // DOM element to render map
  /* State to hold value for map visibility; depending on whether the map is
        loaded the container for map component will be set to visible
    */
  const [mapVisibility, setMapVisibility] = useState('hidden');

  // Initialize the map
  useEffect(() => {
    //console.log(`data- coronamap- useeffect: ${data}`);

    const loadMap = () => {
      // You can store the map instance with useRef too
      /*
            const bounds = [
                [65.818748, 5.979753], // Southwest coordinates
                [100.294876, 37.983175] // Northeast coordinates
                ];
            */
      const map = new mapboxgl.Map({
        container: mapboxRef.current,
        style: 'mapbox://styles/mapbox/dark-v10', // theme of the map
        center: [76.33643, 22.5493], // initial geo location
        //maxBounds: bounds    // restrict map panning to an area
        zoom: 4,
      });

      // Add navigation controls to the top right of the canvas
      map.addControl(new mapboxgl.NavigationControl());
      // Call this method when the map is loaded
      map.once('load', () => {
        // Add our SOURCE
        // with id "points"
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data,
          },
        });

        // Add first layer: active cases
        map.addLayer({ ...mapLayerConfirmed });

        // Add second layer - recoveries
        map.addLayer({ ...mapLayerRecovered });

        // Add third layer - death count
        map.addLayer({ ...mapLayerDead });

        // Create a mapbox popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        // Variable to hold the active country/province on hover
        let lastId;

        // Mouse move event
        map.on('mousemove', 'covid19-cases', (e) => {
          // Get the id from the properties
          const id = e.features[0].properties.id;

          // Only if the id are different we process the tooltip
          if (id !== lastId) {
            lastId = id;

            map.getCanvas().style.cursor = 'pointer';

            const {
              confirmed,
              dead,
              recovered,
              country,
              province,
            } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            // Collect data for the tooltip
            const countryISO =
              lookup.byCountry(country)?.iso2 ||
              lookup.byInternet(country)?.iso2;
            const provinceHTML =
              province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';
            const mortalityRate = ((dead / confirmed) * 100).toFixed(2);
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : '';

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

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        // Mouse leave event
        map.on('mouseleave', 'covid19-cases', function () {
          // Reset the last Id
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
        setMapVisibility('visible');
      });
    };
    loadMap();
  }, [data]);

  return (
    <MapContainer>
      {/* When the map is not visible render the spinner component */}
      {mapVisibility === 'hidden' && <RenderLoader></RenderLoader>}
      <MapBox ref={mapboxRef} visibility={mapVisibility} />
      {/* Assigned Mapbox container */}
    </MapContainer>
  );
};

export default CoronaMap;
