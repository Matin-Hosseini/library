const path = require("path");
const fs = require("fs");

const getDB = () => {
  const db = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");
  const data = JSON.parse(db);

  return data;
};

module.exports = getDB;
