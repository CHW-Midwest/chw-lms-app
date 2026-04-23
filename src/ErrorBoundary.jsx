import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("LMS Crash Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "20px",
          color: "white",
          background: "#2b0a3d",
          minHeight: "100vh"
        }}>
          <h1>⚠️ Something went wrong</h1>
          <p>The LMS encountered an error but did NOT crash completely.</p>
          <button onClick={() => window.location.reload()}>
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}