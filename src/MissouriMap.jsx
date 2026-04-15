export default function MissouriMap({ state, onSelectRegion }) {
  const regions = [
    "stl-metro",
    "kc-metro",
    "bootheel",
    "north-rural"
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: 12 }}>
      {regions.map((r) => (
        <div
          key={r}
          onClick={() => onSelectRegion(r)}
          style={{
            padding: 16,
            borderRadius: 10,
            cursor: "pointer",
            background: `rgba(255,0,0,${state.regions[r].risk})`,
            color: "white",
            fontWeight: "bold"
          }}
        >
          {r}
          <div>Risk: {state.regions[r].risk.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}