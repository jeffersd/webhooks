require("http").createServer((req, res) => {
    req.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("hello world");
}).listen(3000);

