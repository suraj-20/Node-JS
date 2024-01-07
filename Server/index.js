const http = require("http");

http.createServer((req, res) => {
    res.end("Jai Shree Ram");
}).listen(4500);

console.log("Server is listening Jai shree Ram");