const { getDB } = require("../utils/db");

const db = getDB();

const getAllBooks = async (req, res) => {
  const { books } = db;

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ books }));
};

module.exports = { getAllBooks };
