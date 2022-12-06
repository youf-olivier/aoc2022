const fs = require("fs");
const util = require("util");

const getData = (url) =>
  fs.readFileSync(url, {
    encoding: "utf-8",
    flag: "r",
  });

const fullLog = (data) => {
  console.log(
    util.inspect(data, { showHidden: false, depth: null, colors: true })
  );
};

module.exports = { getData, fullLog };
