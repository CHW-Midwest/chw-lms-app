import { useState } from "react";

export function useSimulationEngine(module) {
  const [nodeId, setNodeId] = useState(module.startNode);
  const [state, setState] = useState({
    overdose: 0,
    foodAccess: 0,
    trust: 0
  });

  const node = module.nodes[nodeId];

  function choose(choice) {
    // merge state changes
    if (choice.impact) {
      setState((prev) => ({
        overdose: (prev.overdose || 0) + (choice.impact.overdose || 0),
        foodAccess: (prev.foodAccess || 0) + (choice.impact.foodAccess || 0),
        trust: (prev.trust || 0) + (choice.impact.trust || 0)
      }));
    }

    setNodeId(choice.next);
  }

  function reset() {
    setNodeId(module.startNode);
    setState({ overdose: 0, foodAccess: 0, trust: 0 });
  }

  return { node, choose, reset, state };
}