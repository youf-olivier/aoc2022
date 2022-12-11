const { getData, fullLog } = require("./utils");
const input = getData("./day10.txt");

const lines = input.split(/\n/).map((line) => line.split` `);

let register = 1;
let numCycle = 1;

const historic = {};

const incrementCycle = () => {
  historic[numCycle] = register;
  numCycle++;
};

lines.forEach((line) => {
  const instruction = line[0];
  if (instruction == "noop") {
    incrementCycle();
  } else {
    incrementCycle();
    incrementCycle();
    const val = line[1];
    register += val / 1;
  }
});

fullLog(
  historic[20] * 20 +
    historic[60] * 60 +
    historic[100] * 100 +
    historic[140] * 140 +
    historic[180] * 180 +
    historic[220] * 220
);

const getPixel = (cycle) => {
  const pixelposition = (cycle % 40) - 1;
  const spritePosition = [historic[cycle] - 1, historic[cycle] + 1];
  if (
    pixelposition >= spritePosition[0] &&
    pixelposition <= spritePosition[1]
  ) {
    return "#";
  }
  return ".";
};

const chunkSize = 40;
const chunkArray = (myArray) => {
  var results = [];
  for (let i = 0; i < myArray.length; i += chunkSize) {
    results.push(myArray.slice(i, i + chunkSize));
  }
  return results;
};

const res = chunkArray(Object.keys(historic).map(getPixel));

res.forEach((line) => console.log(line.join``));
