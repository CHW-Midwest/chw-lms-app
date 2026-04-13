import { useState } from "react";
import { module1, module2 } from "./modules.js";

/**
 * CERTIFICATE COMPONENT
 */
function Certificate({ name }) {
  return (
    <div style={styles.certificateContainer}>
      <h1 style={styles.certificateTitle}>
        Certificate of Completion
      </h1>

      <p style={styles.text}>This certifies that</p>

      <h2 style={styles.name}>{name || "Participant"}</h2>

      <p style={styles.text}>
        has successfully completed the CHW Midwest Training Program.
      </p>
    </div>
  );
}

/**
 * MAIN APP
 */
export default function App() {
  const [view, setView] = useState("home");
  const [selectedModule, setSelectedModule] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [name] = useState("CHW Learner");

  return (
    <div style={styles.app}>

      {/* NAV */}
      <nav style={styles.nav}>
        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => setView("modules")}>Modules</button>
        <button onClick={() => setView("certificate")}>Certificate</button>
      </nav>

      {/* HOME */}
      {view === "home" && (
        <div style={styles.page}>
          <h1>CHW Midwest LMS</h1>
          <p>Community Health Worker Training Platform</p>
        </div>
      )}

      {/* MODULE LIST */}
      {view === "modules" && (
        <div style={styles.page}>
          <h2>Select Module</h2>

          <button onClick={() => setSelectedModule(module1)}>
            {module1.title}
          </button>

          <button onClick={() => setSelectedModule(module2)}>
            {module2.title}
          </button>
        </div>
      )}

      {/* MODULE CONTENT */}
      {selectedModule && (
        <div style={styles.page}>
          <h2>{selectedModule.title}</h2>

          <h3>Case Studies</h3>

          {selectedModule.caseStudies.map((cs) => (
            <div key={cs.id} style={styles.card}>
              <p>{cs.text}</p>
            </div>
          ))}

          <button onClick={() => setCompleted(true)}>
            Mark Complete
          </button>

          {completed && (
            <button onClick={() => setView("certificate")}>
              View Certificate
            </button>
          )}
        </div>
      )}

      {/* CERTIFICATE */}
      {view === "certificate" && (
        <Certificate name={name} />
      )}

    </div>
  );
}

/**
 * STYLES
 */
const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    padding: "20px"
  },

  nav: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  page: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginTop: "10px"
  },

  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#fafafa"
  },

  certificateContainer: {
    textAlign: "center",
    padding: "50px",
    border: "2px solid black",
    marginTop: "20px",
    background: "white"
  },

  certificateTitle: {
    color: "#000",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  name: {
    fontSize: "26px",
    fontWeight: "600",
    marginTop: "20px"
  },

  text: {
    fontSize: "16px",
    color: "#333"
  }
};
