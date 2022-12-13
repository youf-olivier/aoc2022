const { getData, fullLog } = require("./utils");
const input = getData("./day13.txt");

const inputs = input.split(/\n\n/).map((input) => input.split(/\n/).map(eval));

//fullLog(inputs);

const prepareItems = (a, b) => {
  // On teste si les deux sont des nombres
  if (typeof a === "number" && typeof b === "number") {
    return [a, b];
  } else {
    return [
      typeof a === "number" ? [a] : [...a],
      typeof b === "number" ? [b] : [...b],
    ];
  }
};

const compare = (a, b) => {
  const [ap, bp] = prepareItems(a, b);

  if (typeof ap === "number" && typeof bp === "number") {
    return ap - bp;
  }
  let res = 0;
  while (res === 0 && ap.length > 0 && bp.length > 0) {
    res = compare(ap.shift(), bp.shift());
  }
  if (res === 0) {
    return ap.length - bp.length;
  }
  return res;
};

const part1 = inputs.reduce((acc, input, index) => {
  if (compare(input[0], input[1]) < 0) {
    return acc + index + 1;
  }
  return acc;
}, 0);

// console.log("part1", part1);

const part2Input = [
  ...input
    .split(/\n/)
    .filter(Boolean)
    .map((input) => input.split(/\n/).map(eval)),
  [[2]],
  [[6]],
];

const part2Sorted = part2Input.sort(compare);

const i1 =
  part2Sorted.findIndex((input) => JSON.stringify(input) === "[[2]]") + 1;
const i2 =
  part2Sorted.findIndex((input) => JSON.stringify(input) === "[[6]]") + 1;

console.log(i1 * i2);
