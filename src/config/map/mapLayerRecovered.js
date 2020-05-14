export const mapLayerRecovered = {
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
            0, 0,
            1, 8,
            100, 12,
            1000, 16,
            4000, 20,
            8000, 28,
            12000, 36,
            100000, 80
        ],
        "circle-color": "#108d90"
    }
};
