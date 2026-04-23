import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useState } from "react";

/* Simple Missouri-style placeholder GeoJSON (replace with full county dataset later) */
const missouriGeo = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "St. Louis City", risk: 5 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-90.3, 38.6],
          [-90.1, 38.6],
          [-90.1, 38.8],
          [-90.3, 38.8],
          [-90.3, 38.6]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "St. Louis County", risk: 4 },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-90.6, 38.5],
          [-90.2, 38.5],
          [-90.2, 38.9],
          [-90.6, 38.9],
          [-90.6, 38.5]
        ]]
      }
    }
  ]
};

function getColor(risk) {
  return risk >= 5
    ? "#e74c3c"
    : risk === 4
    ? "#ff7a00"
    : risk === 3
    ? "#f1c40f"
    : "#2ecc71";
}

export default function GISMap({ name, onBack }) {
  const [selected, setSelected] = useState(null);

  const styleFeature = (feature) => ({
    fillColor: getColor(feature.properties.risk),
    weight: 2,
    color: "#333",
    fillOpacity: 0.7
  });

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => setSelected(feature.properties.name)
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>{name}'s Real GIS Simulation (Leaflet)</h2>

      <p>Click a region to simulate public health risk.</p>

      <MapContainer
        center={[38.6, -90.3]}
        zoom={8}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={missouriGeo}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />

      </MapContainer>

      {selected && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
          <strong>Selected Region:</strong> {selected}
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: "15px" }}>
        Return to LMS
      </button>

    </div>
  );
}