const { getData, fullLog } = require("./utils");
const input = getData("./day8.txt");

const lines = input.split(/\n/).map((line) => line.split``);

const trees = lines.map((line, indexLine) =>
  line.map((tree, indexColumn) => ({
    id: `${indexLine.toString().padStart(2, "0")}${indexColumn
      .toString()
      .padStart(2, "0")}`,
    size: tree / 1,
    coord: [indexLine, indexColumn],
  }))
);

const result = new Set();

// On parcours dans les 4 directions et on remplis le tableau de resultat

let higher = 0;

// Depuis la gauche
for (let i = 0; i < trees.length; i++) {
  higher = -1;
  for (let j = 0; j < trees[i].length; j++) {
    if (trees[i][j].size > higher) {
      result.add(trees[i][j].id);
      higher = trees[i][j].size;
    }
  }
}

// Depuis la droite
for (let i = 0; i < trees.length; i++) {
  higher = -1;
  for (let j = trees[i].length - 1; j >= 0; j--) {
    if (trees[i][j].size > higher) {
      result.add(trees[i][j].id);
      higher = trees[i][j].size;
    }
  }
}

// Depuis le haut
for (let i = 0; i < trees[0].length; i++) {
  higher = -1;
  for (let j = 0; j < trees.length; j++) {
    if (trees[j][i].size > higher) {
      result.add(trees[j][i].id);
      higher = trees[j][i].size;
    }
  }
}

// Depuis le bas
for (let i = 0; i < trees[0].length; i++) {
  higher = -1;
  for (let j = trees.length - 1; j >= 0; j--) {
    if (trees[j][i].size > higher) {
      result.add(trees[j][i].id);
      higher = trees[j][i].size;
    }
  }
}

const gridNbLines = trees.length;
const gridNbCol = trees[0].length;

const calcScenicAxe = (tree, vector) => {
  let result = 0;
  const line = tree.coord[0];
  const col = tree.coord[1];
  switch (vector) {
    case 1:
      for (i = line - 1; i >= 0; i--) {
        result++;
        if (trees[i][col].size >= tree.size) {
          return result;
        }
      }
      return result;
    case 2:
      for (i = line + 1; i < gridNbLines; i++) {
        result++;
        if (trees[i][col].size >= tree.size) {
          return result;
        }
      }
      return result;
    case 3:
      for (i = col - 1; i >= 0; i--) {
        result++;
        if (trees[line][i].size >= tree.size) {
          return result;
        }
      }
      return result;
    case 4:
      for (i = col + 1; i < gridNbCol; i++) {
        result++;
        if (trees[line][i].size >= tree.size) {
          return result;
        }
      }
      return result;
  }
};

// fullLog({ trees });

const part2 = trees.reduce((acc, line) => {
  let maxLineScenicScore = 0;
  line.forEach((tree) => {
    const x = calcScenicAxe(tree, 1);
    const y = calcScenicAxe(tree, 2);
    const z = calcScenicAxe(tree, 3);
    const w = calcScenicAxe(tree, 4);
    const scenicScore = x * y * z * w;

    if (scenicScore > maxLineScenicScore) {
      maxLineScenicScore = scenicScore;
    }
  });
  if (maxLineScenicScore > acc) {
    return maxLineScenicScore;
  }
  return acc;
}, 0);

console.log({ part2 });
