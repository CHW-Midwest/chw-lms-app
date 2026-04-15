import { useMemo } from "react";

export default function Dashboard({ state }) {
  const regions = Object.entries(state.regions);

  // 🌍 SYSTEM RISK INDEX
  const systemRisk = useMemo(() => {
    return (
      regions.reduce((sum, [, r]) => sum + r.risk, 0) /
      regions.length
    );
  }, [state]);

  // 🔴 ALERT LEVEL (CDC-style categorization)
  const alertLevel = useMemo(() => {
    if (systemRisk > 0.75) return "CRITICAL";
    if (systemRisk > 0.55) return "HIGH";
    if (systemRisk > 0.35) return "MODERATE";
    return "LOW";
  }, [systemRisk]);

  // 📈 TREND (last snapshots)
  const trend = useMemo(() => {
    const history = state.history || [];

    return history.slice(-20).map((snap, i) => {
      const avg =
        Object.values(snap.regions).reduce(
          (a, r) => a + r.risk,
          0
        ) / Object.values(snap.regions).length;

      return avg;
    });
  }, [state]);

  // 🚨 HOTSPOT detection
  const hotspots = regions
    .map(([id, r]) => ({ id, risk: r.risk }))
    .sort((a, b) => b.risk - a.risk);

  return (
    <div style={{
      margin: 12,
      padding: 16,
      borderRadius: 12,
      border: "1px solid #ccc",
      background: "#fafafa"
    }}>
      {/* HEADER */}
      <h2 style={{ marginBottom: 10 }}>
        🧬 Epidemiological Surveillance Dashboard
      </h2>

      {/* SYSTEM STATUS BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12
      }}>
        <div>
          <b>System Risk Index:</b>{" "}
          {systemRisk.toFixed(3)}
        </div>

        <div style={{
          fontWeight: "bold",
          color:
            alertLevel === "CRITICAL"
              ? "red"
              : alertLevel === "HIGH"
              ? "orange"
              : "green"
        }}>
          ALERT: {alertLevel}
        </div>
      </div>

      {/* HOTSPOTS PANEL */}
      <div style={{ marginBottom: 12 }}>
        <b>🚨 Hotspots (Top Regions)</b>
        <ul>
          {hotspots.map(h => (
            <li key={h.id}>
              {h.id} — {(h.risk * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      </div>

      {/* TREND PANEL (ASCII EPIDEMIC CURVE) */}
      <div>
        <b>📈 Epidemic Curve (System Average Risk)</b>

        <div style={{
          display: "flex",
          alignItems: "flex-end",
          height: 90,
          gap: 3,
          marginTop: 8,
          borderLeft: "2px solid #aaa",
          borderBottom: "2px solid #aaa",
          padding: 6
        }}>
          {trend.map((t, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: t * 90,
                background:
                  t > 0.7
                    ? "red"
                    : t > 0.4
                    ? "orange"
                    : "green"
              }}
              title={`t=${i}, risk=${t.toFixed(2)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}