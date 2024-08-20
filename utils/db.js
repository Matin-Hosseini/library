const path = require("path");
const fs = require("fs");

const getDB = () => {
  const db = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");
  const data = JSON.parse(db);

  return data;
};

const insertDB = (newData) => {
  fs.writeFileSync(path.join(__dirname, "../db.json"), JSON.stringify(newData));
};

module.exports = { getDB, insertDB };
