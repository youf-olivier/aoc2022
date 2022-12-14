const { getData, fullLog } = require("./utils");
const input = getData("./day14.txt");

const rocksInput = input
  .split(/\n/)
  .map((line) => line.split("->").map((coord) => coord.split(",").map(Number)));

const printGrid = (gridToPrint) => {
  gridToPrint.reverse().map((row) => console.log(row.flat().join("")));
};

const maxDepth = (rocks) =>
  rocks.reduce((acc, rockline) => {
    const maxDepthLine = rockline.reduce((acc, [_, y]) => Math.max(acc, y), 0);
    return Math.max(acc, maxDepthLine);
  }, 0);

const minX = (rocks) =>
  rocks.reduce((acc, rockline) => {
    const minXLine = rockline.reduce((acc, [x]) => Math.min(acc, x), Infinity);
    return Math.min(acc, minXLine);
  }, Infinity);

const maxX = (rocks) =>
  rocks.reduce((acc, rockline) => {
    const maxXLine = rockline.reduce((acc, [x]) => Math.max(acc, x), 0);
    return Math.max(acc, maxXLine);
  }, 0);

const fillLineOfGrid = (cave, grid, [x, y], [x2, y2]) => {
  if (x === x2) {
    for (let i = Math.min(y, y2); i <= Math.max(y, y2); i++) {
      grid[x - cave.startX][i] = "#";
    }
  } else {
    for (let i = Math.min(x, x2); i <= Math.max(x, x2); i++) {
      grid[i - cave.startX][y] = "#";
    }
  }
};

const fillGrid = (cave, grid, rocks, fillLastLine) => {
  rocks.forEach((rockline) => {
    for (let i = 0; i < rockline.length - 1; i++) {
      const [x, y] = rockline[i];
      const [x2, y2] = rockline[i + 1];
      fillLineOfGrid(cave, grid, [x, y], [x2, y2]);
    }
  });
};

const isOccupied = (grid, [x, y]) =>
  !isOutOfTheBox(grid, [x, y]) && (grid[x][y] === "#" || grid[x][y] === "o");

const isOutOfTheBox = (grid, [x, y]) =>
  x < 0 || x >= grid.length || y < 0 || y >= grid[0].length;

const nextMove = (grid, [x, y]) => {
  if (!isOccupied(grid, [x, y + 1])) {
    return [x, y + 1];
  } else if (!isOccupied(grid, [x - 1, y + 1])) {
    return [x - 1, y + 1];
  } else if (!isOccupied(grid, [x + 1, y + 1])) {
    return [x + 1, y + 1];
  }
  return [x, y];
};

const hasNextMove = (grid, [x, y], [sx, sy]) =>
  !isOccupied(grid, [x, y + 1]) ||
  !isOccupied(grid, [x - 1, y + 1]) ||
  !isOccupied(grid, [x + 1, y + 1]);

const dropUnitOfSand = (grid, startingPoint) => {
  let [x, y] = startingPoint;
  let [nx, ny] = [x, y];
  while (hasNextMove(grid, [nx, ny], startingPoint)) {
    if (isOutOfTheBox(grid, [nx, ny])) return false;
    [nx, ny] = nextMove(grid, [nx, ny]);
  }
  console.log(nx, ny);
  grid[nx][ny] = "o";
  if (nx === startingPoint[0] && ny === startingPoint[1]) {
    return false;
  }
  return true;
};

const part1 = () => {
  const cave = {
    startX: minX(rocksInput),
    endX: maxX(rocksInput),
    maxDepth: maxDepth(rocksInput),
  };
  const startPoint = (cave) => [500 - cave.startX, 0];
  const grid = new Array(maxX(rocksInput) - minX(rocksInput) + 1)
    .fill([])
    .map(() => new Array(maxDepth(rocksInput)).fill("."));

  fillGrid(cave, grid, rocksInput);

  let counter = 0;

  while (dropUnitOfSand(grid, startPoint(cave))) {
    counter++;
  }

  printGrid(grid);
  console.log(counter);
};

// part1();

const part2 = () => {
  const cave = {
    startX: minX(rocksInput) - 1000,
    endX: maxX(rocksInput) + 1000,
    maxDepth: maxDepth(rocksInput) + 3,
  };
  const startPoint = (cave) => [500 - cave.startX, 0];
  const grid = new Array(maxX(rocksInput) - minX(rocksInput) + 1000 * 2 + 1)
    .fill([])
    .map(() => new Array(maxDepth(rocksInput) + 3).fill("."));

  fillGrid(cave, grid, rocksInput, true);

  let counter = 0;

  grid.forEach((row) => (row[row.length - 1] = "#"));

  while (dropUnitOfSand(grid, startPoint(cave))) {
    counter++;
  }

  printGrid(grid);
  console.log(counter);
};

part2();
