const { createSecretKey } = require("crypto");
const { getData, fullLog } = require("./utils");

const input = getData("./day5.txt");

const [crates, instructions] = input.split(/\n\n/).map((a) => a.split(/\n/));
crates.pop();

// On fait des beau petits tableau du bateau
const stackSize = ~~((crates[0].length + 1) / 4);
let cratesByColunm = new Array(stackSize).fill("").map(() => []);

crates.forEach((line) => {
  line.split("").forEach((digit, index) => {
    if ((index - 1) % 4 === 0) {
      const column = (index - 1) / 4;
      if (digit !== " ") {
        cratesByColunm[column].push(digit);
      }
    }
  });
});

cratesByColunm = cratesByColunm.map((a) => a.slice().reverse());

fullLog({ cratesByColunm });

const instructionCleaned = instructions.map((instruction) => {
  const [_, count, from, to] = /(\d+) from (\d+) to (\d+)/.exec(instruction);
  return [count, from, to];
});

const part1 = () => {
  instructionCleaned.forEach(([count, from, to]) => {
    for (let i = 0; i < count; i++) {
      const digit = cratesByColunm[from - 1].pop();
      cratesByColunm[to - 1].push(digit);
    }
  });

  fullLog({ cratesByColunm });

  const res = cratesByColunm.reduce((acc, curr) => acc + curr.pop(), "");

  fullLog({ res });
};

const part2 = () => {
  instructionCleaned.forEach(([count, from, to]) => {
    const column = cratesByColunm[from - 1];
    const digit = column.splice(column.length - count, column.length);
    cratesByColunm[to - 1].push(...digit);
  });

  fullLog({ cratesByColunm });

  const res = cratesByColunm.reduce((acc, curr) => acc + curr.pop(), "");

  fullLog({ res });
};

part2();
