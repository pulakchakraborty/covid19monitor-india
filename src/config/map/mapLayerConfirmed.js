export const mapLayerConfirmed = {
    id: "covid19-cases",
    source: "points", // this should be the id of the source
    type: "circle",
    // paint properties
    paint: {
        "circle-opacity": 0.75,
        /*"circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["get", "confirmed"],
            1, 1,
            200000, 1.8,
        ],*/
        "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "confirmed"],
            /*1, 10,
            100, 15,
            1000, 20,
            4000, 25,
            8000, 35,
            12000, 45,
            100000, 100*/
            1, 4,
            100, 8,
            1000, 12,
            4000, 16,
            10000, 20,
            100000, 100,
            500000, 200,
            2000000, 300
        ],
        "circle-color": "#d14f69"
    }
};
