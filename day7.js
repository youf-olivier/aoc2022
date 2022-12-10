const { getData, fullLog } = require("./utils");
const input = getData("./day7.txt");

const lines = input.split(/\n/);
lines.shift();

let currentFolder = {
  name: "/",
  size: 0,
  children: [],
  path: [],
};

const fileSystem = {
  ...currentFolder,
};

lines.forEach((line, index) => {
  if (line.startsWith("$ cd")) {
    const dir = line.split(" ")[2];
    if (dir === "..") {
      const path = [...currentFolder.path];
      path.pop();
      currentFolder = fileSystem;
      path.forEach((p) => {
        currentFolder = currentFolder.children.find(({ name }) => name === p);
      });
    } else {
      const newFolder = {
        name: `${dir}`,
        size: 0,
        children: [],
        path: [...(currentFolder?.path ?? []), dir],
      };
      if (currentFolder) {
        currentFolder.children.push(newFolder);
      }
      currentFolder = newFolder;
    }
  } else if (!line.startsWith("$ ls")) {
    const fisrtPart = line.split(" ")[0];
    const secondPart = line.split(" ")[1];
    if (Number.parseInt(fisrtPart)) {
      const newFolder = {
        name: `${secondPart}`,
        size: Number.parseInt(fisrtPart),
        children: [],
        path: [...(currentFolder?.path ?? []), secondPart],
      };
      if (currentFolder) {
        currentFolder.children.push(newFolder);
      }
    }
  }
});

const fillSizeOfFolders = (folder) =>
  (folder.size =
    folder.size +
    folder.children.reduce((acc, child) => {
      return acc + fillSizeOfFolders(child);
    }, 0));

fillSizeOfFolders(fileSystem);

const sumFolderSizeUnder100000 = (folder) => {
  const base =
    folder.size < 100000 && folder.children.length > 0 ? folder.size : 0;
  return (
    base +
    folder.children.reduce((acc, child) => {
      return acc + sumFolderSizeUnder100000(child);
    }, 0)
  );
};

const minSize = 30000000 - (70000000 - fileSystem.size);

const sizesOfFolders = (folder) =>
  [
    folder.children.length > 0 ? folder.size : null,
    ...folder.children.reduce(
      (acc, child) => [...acc, ...sizesOfFolders(child)],
      []
    ),
  ].filter((a) => a && a > minSize);

console.log(sizesOfFolders(fileSystem).sort((a, b) => a - b)[0]);
