export const mapLayerDead = {
    id: "covid19-dead",
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
            ["get", "dead"],
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
            ["get", "dead"],
            1, '#969696',
            1000, '#737373',
            10000, '#525252',
            50000, '#252525'
        ]
    }
};
