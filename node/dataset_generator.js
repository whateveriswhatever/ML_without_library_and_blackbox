const draw = require("../common/draw");

const { createCanvas } = require("canvas");
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

const constants = {};

constants.DATA_DIR = "../data";

constants.RAW_DIR = `${constants.DATA_DIR}/raw`;
constants.DATASET_DIR = `${constants.DATA_DIR}/dataset`;
constants.JSON_DIR = `${constants.DATASET_DIR}/json`;
constants.IMG_DIR = `${constants.DATASET_DIR}/img`;
constants.SAMPLES = `${constants.DATASET_DIR}/samples.json`;

const fileSystem = require("fs");

const fileNames = fileSystem.readdirSync(constants.RAW_DIR);

const samples = [];

let generateImageFile = (outFile, paths) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw.paths(ctx, paths);

  const buffer = canvas.toBuffer("imgage/png");
  fileSystem.writeFileSync(outFile, buffer);
};

let id = 1;

fileNames.forEach((fileName) => {
  const content = fileSystem.readFileSync(`${constants.RAW_DIR}/${fileName}`);
  const { session, student, drawings } = JSON.parse(content);

  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    const paths = drawings[label];

    fileSystem.writeFileSync(
      `${constants.JSON_DIR}/${id}.json`,
      JSON.stringify(drawings[label])
    );

    generateImageFile(`${constants.IMG_DIR}/${id}.png`, paths);

    id++;
  }
});

fileSystem.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

// let generateImageFile = (outFile, paths) => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   draw.paths(ctx, paths);

//   const buffer = canvas.toBuffer("imgage/png");
//   fileSystem.writeFileSync(outFile, buffer);
// };
