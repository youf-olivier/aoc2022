const getData = require("./utils");
const getLetterValue = require("./alphabet");

const input = getData("./day3.txt");
const formatedInputs = input
  .split(/\n/)
  .map((a) => [
    a.slice(0, a.length / 2).split(""),
    a.slice(a.length / 2).split(""),
  ]);

// On divise le tableau en tableau de tableau de 3 éléments
const splitArrayInArrayOfArrayOf3Elements = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i += 3) {
    result.push(arr.slice(i, i + 3));
  }
  return result;
};

const formatedInputsP2 = splitArrayInArrayOfArrayOf3Elements(input.split(/\n/));

const findCommonValues = (arr1, arr2, arr3 = []) => {
  const commonValues = new Set();
  arr1.forEach((a) => {
    if (arr2.includes(a) && arr3.includes(a)) {
      commonValues.add(a);
    }
  });
  return [...commonValues];
};

const part1 = () => {
  const res = formatedInputs.reduce((acc, curr) => {
    const [first, second] = curr;
    const commonValues = findCommonValues(first, second);
    return acc + (getLetterValue(commonValues[0]) ?? 0);
  }, 0);

  console.log({ res });
};

const part2 = () => {
  const res = formatedInputsP2.reduce((acc, curr) => {
    const [first, second, third] = curr;
    const commonValues = findCommonValues(
      first.split(""),
      second.split(""),
      third.split("")
    );

    console.log({ commonValues });
    return acc + (getLetterValue(commonValues[0]) ?? 0);
  }, 0);

  console.log({ res });
};

part1();

part2();
