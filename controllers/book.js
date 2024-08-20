const { getDB, insertDB } = require("../utils/db");
const parseBody = require("../utils/parseBody");

const db = getDB();

const getAllBooks = async (req, res) => {
  const { books } = db;

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ books }));
};

const addBook = async (req, res) => {
  const { books, users, roles } = db;

  const { userID, name, author } = await parseBody(req);

  const targetUser = users.find((user) => user.id === userID);
  const adminRole = roles.find((role) => role.name === "ADMIN");

  const isAdmin = targetUser.roleID === adminRole.id;

  if (!isAdmin) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "User doesn't have access" }));
  }

  const isBookAvailible = books.some((book) => book.name === name);

  if (isBookAvailible) {
    res.writeHead(405, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "Book exists" }));
  }

  const newBook = {
    id: crypto.randomUUID(),
    name,
    author,
  };

  books.push(newBook);
  insertDB(db);

  res.writeHead(201, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ msg: "book addded" }));
};

const removeBook = async (req, res) => {
  const { users, books, roles } = db;

  const body = await parseBody(req);

  const { userID, bookID } = body;

  const targetUser = users.find((user) => user.id === userID);
  const adminRole = roles.find((role) => role.name === "ADMIN");

  const isAdmin = targetUser.roleID === adminRole.id;

  if (!isAdmin) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "User doesn't have access" }));
  }

  const bookExists = books.some((book) => book.id === bookID);

  if (!bookExists) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "Book doesn't exist" }));
  }

  const bookIndex = books.findIndex((book) => book.id === bookID);
  books.splice(bookIndex, 1);

  insertDB(db);
  
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ msg: "Book removed" }));
};

module.exports = { getAllBooks, addBook, removeBook };
