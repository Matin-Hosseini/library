const { getDB, insertDB } = require("../utils/db");
const parseBody = require("../utils/parseBody");

const db = getDB();

const register = async (req, res) => {
  const body = await parseBody(req);

  const newUser = {
    id: crypto.randomUUID(),
    roleID: 1,
    ...body,
  };

  db.users.push(newUser);
  insertDB(db);

  res.writeHead(201, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ msg: "new user created successfully" }));
};

const login = async (req, res) => {
  const { username, password } = await parseBody(req);

  const { users } = db;

  const targetUser = users.find((user) => user.username === username);

  if (!targetUser) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "user not found" }));
  }

  const isPasswordMatch = targetUser.password === password;

  if (!isPasswordMatch) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "username or password is wrong" }));
  }

  res.writeHead(201, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ msg: "User logged in", targetUser }));
};

const reserveBook = async (req, res) => {
  const { users, books, reservedBooks } = db;

  const { userID, bookID } = await parseBody(req);

  const isBookReserved = reservedBooks.some((item) => item.bookID === bookID);

  if (isBookReserved) {
    res.writeHead(405, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "Book is reserved" }));
  }

  reservedBooks.push({ id: crypto.randomUUID(), userID, bookID });
  insertDB(db);

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ msg: "book reserved" }));
};

const makeAdmin = async (req, res) => {
  const { users, roles } = db;

  const { userID, newAdminID } = await parseBody(req);

  const targetUser = users.find((user) => user.id === userID);
  const adminRole = roles.find((role) => role.name === "ADMIN");

  const isAdmin = targetUser.roleID === adminRole.id;

  if (!isAdmin) {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ err: "User doesn't have access" }));
  }

  const newAdmin = users.find((user) => user.id === newAdminID);

  if (!newAdmin) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ msg: "User doesn't exist" }));
  }

  newAdmin.roleID = adminRole.id;
  insertDB(db);

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ msg: "User is now admin" }));
};

module.exports = { register, login, reserveBook, makeAdmin };
