const { getData } = require("./utils");
const input = getData("./day6.txt");

const inputArray = input.split("");

const part = (count) => {
  const pack = [...inputArray].slice(0, count);

  inputArray.every((curr, index) => {
    const pckFiltered = new Set(pack);
    if (pckFiltered.size === count) {
      console.log(index);
      return false;
    }

    pack.shift();
    pack.push(curr);

    return true;
  });
};

part(4);
part(14);
