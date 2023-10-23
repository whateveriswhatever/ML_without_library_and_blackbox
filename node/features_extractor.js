const constants = require("../common/constants");
const featureFunctions = require("../common/featureFunctions");

const fileSystem = require("fs");

console.log("Extracting features....");

const samples = JSON.parse(fileSystem.readFileSync(constants.SAMPLES));

for (const sample of samples) {
  const paths = JSON.parse(
    fileSystem.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`)
  );

  const functions = featureFunctions.inUse.map((func) => func.function);

  sample.point = functions.map((func) => func(paths));

  // sample.point = [
  //   featureFunctions.getPathCount(paths),
  //   featureFunctions.getPointCount(paths),
  // ];
}

// const featureNames = ["Path Count", "Point Count"];
const featureNames = featureFunctions.inUse.map((func) => func.name);

fileSystem.writeFileSync(
  constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((sample) => {
      //   console.log(sample);
      return {
        id: sample.id,
        student_name: sample.student_name,
        student_id: sample.student_id,
        point: sample.point,
        label: sample.label,
      };
    }),
  })
);

fileSystem.writeFileSync(
  constants.FEATURES_JS,
  `const features = ${JSON.stringify({ featureNames, samples })};`
);

console.log("Done!");
