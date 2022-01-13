const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>Hello from server</h1>");
    res.end();
  } else if (req.url === "/api") {
    res.write("<h1>Welcome to server api</h1>");
    res.end();
  } else if (req.url === "/api/heroes") {
    // res.write(JSON.stringify([1, 2, 3]));
    res.write(
      JSON.stringify([
        { id: 1, name: "JohnCena", weight: "98kg" },
        { id: 2, name: "TheRock", weight: "108kg" },
      ])
    );
    res.end();
  } else {
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});
server.on("connection", (socket) => {
  console.log("found connection");
});

server.listen(3000);
console.log("server is running");
