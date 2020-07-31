export const mapLayerConfirmed = {
  id: 'covid19-cases',
  source: 'points', // this should be the id of the source
  type: 'circle',
  // paint properties
  paint: {
    'circle-opacity': 0.75,
    /*"circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["get", "confirmed"],
            1, 1,
            200000, 1.8,
        ],*/
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'confirmed'],
        1, 10,
        1000, 15,
        50000, 20,
        100000, 25,
        500000, 35,
        2000000, 50,
        4000000, 60
    ],
    'circle-color': '#d14f69',
  },
};
