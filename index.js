const http = require("http");
const fs = require("fs");
const path = require("path");
const getDB = require("./utils/getDB");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const db = getDB();

  if (req.url === "/add-user") {
    const newUser = { id: crypto.randomUUID(), name: "alireza", age: 55 };

    db.users.push(newUser);

    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(db));

    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(getDB()));
  }

  res.end("this is matin hosseini");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
