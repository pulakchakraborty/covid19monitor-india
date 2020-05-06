export const mapLayerConfirmed = {
    id: "covid19-cases",
    source: "points", // this should be the id of the source
    type: "circle",
    // paint properties
    paint: {
        "circle-opacity": 0.75,
        "circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["get", "confirmed"],
            1, 1,
            200000, 1.8,
        ],
        "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "confirmed"],
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
            ["get", "confirmed"],
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
};
