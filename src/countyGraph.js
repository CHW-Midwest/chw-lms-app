export function buildSimpleGraph(features) {
  const graph = {};

  const ids = features.map((f) => f.id);

  ids.forEach((id, i) => {
    graph[id] = [
      ids[i - 1],
      ids[i + 1],
      ids[i - 10],
      ids[i + 10]
    ].filter(Boolean);
  });

  return graph;
}