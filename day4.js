const { getData, fullLog } = require("./utils");

const input = getData("./day4.txt");

const formatedInputs = input
  .split(/\n/)
  .map((a) => a.split(",").map((b) => b.split("-").map((c) => parseInt(c))));

const isContains = (rangeArray, rangeArray2) => {
  const [min, max] = rangeArray;
  const [min2, max2] = rangeArray2;
  const res = (min <= min2 && max >= max2) || (min >= min2 && max <= max2);
  return res;
};

const isOverlap = (rangeArray, rangeArray2) => {
  const [min, max] = rangeArray;
  const [min2, max2] = rangeArray2;
  const res =
    (min >= min2 && min <= max2) ||
    (max >= min2 && max <= max2) ||
    (min2 >= min && min2 <= max) ||
    (max2 >= min && max2 <= max);
  return res;
};

const part1 = () => {
  const res = formatedInputs.filter((curr) => isContains(curr[0], curr[1]));

  fullLog(res.length);
};

const part2 = () => {
  const res = formatedInputs.filter((curr) => isOverlap(curr[0], curr[1]));

  fullLog(res.length);
};

part1();
part2();
