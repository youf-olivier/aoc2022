const getData = require("./utils");
const input = getData("./day2.txt");
const formatedInputs = input.split(/\n/).map((a) => a.split(" "));

const values = {
  A: { value: 1, won: "Z", draw: "X", lose: "Y" },
  B: { value: 2, won: "X", draw: "Y", lose: "Z" },
  C: { value: 3, won: "Y", draw: "Z", lose: "X" },
  X: { value: 1, won: "C", draw: "A", lose: "B", result: 0 },
  Y: { value: 2, won: "A", draw: "B", lose: "C", result: 3 },
  Z: { value: 3, won: "B", draw: "C", lose: "A", result: 6 },
};

// part 1
const part1 = () => {
  const result = formatedInputs.reduce((acc, curr) => {
    const p1 = values[curr[0]];
    const p2 = values[curr[1]];
    if (p2.draw === curr[0]) {
      return acc + 3 + p2.value;
    }
    if (p2.won === curr[0]) {
      return acc + p2.value + 6;
    }
    return acc + p2.value;
  }, 0);

  console.log(result);
};

// Part 2
const part2 = () => {
  const total = formatedInputs.reduce(
    (acc, curr) =>
      acc +
      Object.values(values).find((a) => a.{lose} === curr[0]).value +
      values[curr[1]].result,
    0
  );

  console.log(total);
};

part1();

part2();
