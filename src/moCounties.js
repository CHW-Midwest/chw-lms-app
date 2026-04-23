export default {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "St. Louis City",
        risk: 5
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-90.3, 38.6],
            [-90.1, 38.6],
            [-90.1, 38.8],
            [-90.3, 38.8],
            [-90.3, 38.6]
          ]
        ]
      }
    }
  ]
};