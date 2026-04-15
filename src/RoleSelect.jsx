export default function RoleSelect({ role, setRole }) {
  const roles = [
    {
      id: "navigator",
      label: "Navigator",
      description: "Improves coordination and referrals"
    },
    {
      id: "outreach",
      label: "Outreach Worker",
      description: "Boosts prevention and education impact"
    },
    {
      id: "analyst",
      label: "Data Analyst",
      description: "Improves prediction efficiency"
    }
  ];

  return (
    <div style={{
      padding: 12,
      borderBottom: "1px solid #ddd"
    }}>
      <h3 style={{ marginBottom: 8 }}>
        👥 CHW Role Selection
      </h3>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ccc",
              cursor: "pointer",
              background: role === r.id ? "#111" : "#f5f5f5",
              color: role === r.id ? "white" : "black",
              textAlign: "left",
              minWidth: 180
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {r.label}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {r.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}