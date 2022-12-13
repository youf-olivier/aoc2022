const getLetterValue = require("./alphabet");
const { getData, fullLog } = require("./utils");
const input = getData("./day12.txt");

let start = [];

const getGrid = (input) => {
  const gridToReturn = input.split(/\n/).map((row, rowIndex) =>
    row.split``.map((letter, colIndex) => {
      const score = letter === "S" ? 0 : Infinity;
      if (letter === "S") {
        start = [rowIndex, colIndex];
      }
      return { letter, adjacents: [], score, coord: [rowIndex, colIndex] };
    })
  );
  gridToReturn.forEach((row, x) => {
    row.forEach((cell, y) => {
      cell.adjacents = getAdjacent(gridToReturn, x, y);
    });
  });
  return gridToReturn;
};

const printGrid = (gridToPrint) => {
  gridToPrint.map((row) =>
    console.log(
      row
        .flat()
        .map(
          (cell) =>
            `${
              cell.score === Infinity
                ? "INF"
                : cell.score.toString().padStart(3, "0")
            }${cell.letter}`
        ).join` `
    )
  );
};

const getLocalLetterValue = (letter) =>
  letter === "S" ? 1 : letter === "E" ? 26 : getLetterValue(letter);

const getAdjacent = (grid, x, y) => {
  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  const result = [];
  const letterValue = getLocalLetterValue(grid[x][y].letter);
  adjacent.forEach(([i, j]) => {
    const adjacentLetter = grid[i] && grid[i][j] && grid[i][j].letter;
    const adjacentValue = getLocalLetterValue(adjacentLetter);
    if (grid[i] && grid[i][j] && adjacentValue <= letterValue + 1) {
      result.push([i, j]);
    }
  });
  return result;
};

const calculeScore = (grid, x, y) => {
  let queue = [[x, y]];
  let score = 1;
  while (queue.length) {
    let nextQueue = [];
    queue.forEach(([i, j]) => {
      const adjacents = grid[i][j].adjacents;
      if (adjacents.length) {
        adjacents.forEach(([ax, ay]) => {
          if (grid[ax][ay].score === Infinity) {
            grid[ax][ay].score = Math.min(score, grid[ax][ay].score);
            nextQueue.push([ax, ay]);
          }
        });
      }
    });
    queue = [...nextQueue];
    nextQueue = [];
    score++;
  }
};

const gridPart1 = getGrid(input);

calculeScore(gridPart1, start[0], start[1]);

fullLog(gridPart1.flat().find((cell) => cell.letter === "E").score);

const gridPart2 = getGrid(input);

// On cherche tous les starts
const startingPoints = gridPart2
  .flat()
  .filter((cell) => cell.letter === "S" || cell.letter === "a")
  .map((cell) => cell.coord);

// Pour chaque start, on calcule le score
const res = [];
startingPoints.forEach(([x, y]) => {
  const gridClone = getGrid(input);
  calculeScore(gridClone, x, y);
  res.push(gridClone.flat().find((cell) => cell.letter === "E").score);
});

// On récupère le min du tableau
fullLog(Math.min(...res));
