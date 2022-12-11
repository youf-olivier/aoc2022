const { getData, fullLog } = require("./utils");
const input = getData("./day9.txt");

const moves = input.split(/\n/).map((line) => line.split` `);

let headPosition = [0, 0];
let tailPosition = [0, 0];

const moveCursor = (position, vector) => [
  position[0] + vector[0],
  position[1] + vector[1],
];

const historic = new Set();
historic.add("0:0");

const getMaxMove = (move) => (move > 0 ? 1 : move < 0 ? -1 : 0);

const isNear = (positionTail, positionHead) =>
  Math.abs(positionHead[0] - positionTail[0]) <= 1 &&
  Math.abs(positionHead[1] - positionTail[1]) <= 1;

const followHead = (positionTail, positionHead) => {
  if (isNear(positionHead, positionTail)) {
    return positionTail;
  }

  const vectorMove = [
    getMaxMove(positionHead[0] - positionTail[0]),
    getMaxMove(positionHead[1] - positionTail[1]),
  ];

  return moveCursor(positionTail, vectorMove);
};

const getVector = (direction) => {
  switch (direction) {
    case "R":
      return [1, 0];
    case "L":
      return [-1, 0];
    case "U":
      return [0, 1];
    case "D":
      return [0, -1];
  }
};

moves.forEach((move) => {
  const direction = move[0];
  const vector = getVector(direction);
  const distance = move[1] / 1;
  for (let i = 0; i < distance; i++) {
    headPosition = moveCursor(headPosition, vector);
    tailPosition = followHead(tailPosition, headPosition);
    historic.add(`${tailPosition[0]}:${tailPosition[1]}`);
  }
});

fullLog(historic.size);

const startPosition = [0, 0];
const rope = Array(10).fill(startPosition);
const ropehistoric = new Set();
ropehistoric.add("0:0");

moves.forEach((move) => {
  const direction = move[0];
  const vector = getVector(direction);
  const distance = move[1] / 1;
  for (let i = 0; i < distance; i++) {
    rope[0] = moveCursor(rope[0], vector);
    for (let i = 1; i < rope.length; i++) {
      rope[i] = followHead(rope[i], rope[i - 1]);
    }
    ropehistoric.add(`${rope[9][0]}:${rope[9][1]}`);
  }
});

fullLog(ropehistoric.size);
