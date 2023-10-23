const featureFunctions = {};

featureFunctions.getPathCount = (paths) => {
  return paths.length;
};

featureFunctions.getPointCount = (paths) => {
  const points = paths.flat();
  return points.length;
};

featureFunctions.getWidth = (paths) => {
  const points = paths.flat();

  const x = points.map((point) => point[0]);

  const min = Math.min(...x);
  const max = Math.max(...x);
  return max - min;
};

featureFunctions.getHeight = (paths) => {
  const points = paths.flat();

  const y = points.map((point) => point[1]);

  const min = Math.min(...y);
  const max = Math.max(...y);

  return max - min;
};

featureFunctions.inUse = [
  // { name: "Width", function: featureFunctions.getWidth },
  // { name: "Height", function: featureFunctions.getHeight },

  { name: "Path Count", function: featureFunctions.getPathCount },
  { name: "Point Count", function: featureFunctions.getPointCount },
];

if (typeof module !== "undefined") {
  module.exports = featureFunctions;
}
