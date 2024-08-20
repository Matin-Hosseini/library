const http = require("http");
const registerController = require("./controllers/register");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/register") {
    registerController(req, res);
    return;
  }

  res.end("this is the library");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
