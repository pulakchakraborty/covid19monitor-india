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
};
