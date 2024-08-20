const { getDB, insertDB } = require("../utils/db");
const parseBody = require("../utils/parseBody");

const register = async (req, res) => {
  const db = getDB();

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

module.exports = { register };
