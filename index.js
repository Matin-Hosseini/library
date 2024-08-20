const http = require("http");
const {
  register,
  login,
  reserveBook,
  makeAdmin,
} = require("./controllers/user");
const { getAllBooks, addBook, removeBook } = require("./controllers/book");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/register") {
    register(req, res);
    return;
  }
  if (req.method === "POST" && req.url === "/api/login") {
    login(req, res);
    return;
  }
  if (req.method === "POST" && req.url === "/api/reserve-book") {
    reserveBook(req, res);
    return;
  }
  if (req.method === "GET" && req.url === "/api/books") {
    getAllBooks(req, res);
    return;
  }
  if (req.method === "POST" && req.url === "/api/add-book") {
    addBook(req, res);
    return;
  }
  if (req.method === "DELETE" && req.url === "/api/remove-book") {
    removeBook(req, res);
    return;
  }
  if (req.method === "PUT" && req.url === "/api/make-admin") {
    makeAdmin(req, res);
    return;
  }

  res.end("this is the library");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
