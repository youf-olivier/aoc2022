const getData = require("./utils");
const input = getData("./day1.txt");
const formatedInputs = input.split(/\n\n/).map((a) => a.split(/\n/));

// Part 1
const part1 = () => {
  const result = formatedInputs.reduce(
    (acc, curr, index) => {
      const total = curr.reduce((acc, curr) => acc + curr / 1, 0);
      if (total > acc.total) {
        return {
          acc: index,
          total,
        };
      }

      return acc;
    },
    { index: 0, total: 0 }
  );
  console.log(result);
};

// Part 2 Récupérer les 3 plus grandes quantités
const part2 = () => {
  const result = formatedInputs.map((cur) =>
    cur.reduce((acc, curr) => acc + curr / 1, 0)
  );

  // On tri le tableau
  const sorted = result.sort((a, b) => b - a);

  // On récupère les 3 plus grandes valeurs
  const top3 = sorted.slice(0, 3).reduce((acc, curr) => acc + curr, 0);

  console.log(top3);
};

// part1();

part2();
