const { getData, fullLog } = require("./utils");
const input = getData("./day11.txt");

const monkeysRaw = input.split(/\n\n/);

// Operation:
// param "new = old + 1"
// return function (old) { return old + 1; }
const getOperation = (operationRaw) => {
  const [_, operation, valueRow] = operationRaw.split("Operation: new = ")[1]
    .split` `;

  return (old) => {
    const value = isNaN(valueRow / 1) ? old : Number(valueRow);
    switch (operation) {
      case "+":
        return old + value;
      case "*":
        return old * value;
    }
    return -1;
  };
};

const monkeys = monkeysRaw.map((monkey) => {
  const [_, itemsRaw, operationRaw, dividerRaw, trueMonkeyRaw, falseMonkeyRaw] =
    monkey.split(/\n/);

  const items = itemsRaw.match(/\d+/g).map((item) => Number(item));
  const operation = getOperation(operationRaw);
  const divider = Number(dividerRaw.split`Test: divisible by `[1]);
  return {
    items,
    operation,
    divider,
    trueMonkey: trueMonkeyRaw.split`If true: throw to monkey `[1] / 1,
    falseMonkey: falseMonkeyRaw.split`If false: throw to monkey `[1] / 1,
    inspectItem: 0,
  };
});

const moduler = monkeys.reduce((acc, monkey) => acc * monkey.divider, 1);

const inspectItems = (monkeys, id) => {
  const monkey = monkeys[id];
  monkey.items.forEach((item) => {
    monkey.inspectItem++;
    const worryLevel = monkey.operation(item);
    let monkeyNext;
    if (worryLevel % monkey.divider == 0) {
      monkeyNext = monkey.trueMonkey;
    } else {
      monkeyNext = monkey.falseMonkey;
    }
    monkeys[monkeyNext].items.push(worryLevel % moduler);
  });
  monkey.items = [];
};

const makeACycle = (monkeys) => {
  monkeys.forEach((_, index) => {
    inspectItems(monkeys, index);
  });
};

// On inspecte 20 fois
for (let i = 0; i < 10000; i++) {
  makeACycle(monkeys);
}

const res = monkeys
  .map(({ inspectItem }) => inspectItem)
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 2)
  .reduce((acc, item) => acc * item, 1);

console.log(res);
