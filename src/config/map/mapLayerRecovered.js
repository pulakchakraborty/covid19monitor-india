export const mapLayerRecovered = {
  id: 'covid19-recovered',
  source: 'points', // this should be the id of the source
  type: 'circle',
  // paint properties
  paint: {
    'circle-opacity': 0.75,
    /*"circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["get", "recovered"],
            1, 1,
            100000, 1.5,
        ],*/
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'recovered'],
        0, 0,
        1, 10,
        1000, 15,
        50000, 20,
        100000, 25,
        500000, 35,
        2000000, 50,
        4000000, 60
    ],
    'circle-color': '#108d90',
  },
};
