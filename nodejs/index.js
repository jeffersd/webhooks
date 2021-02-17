const server = require("http").createServer();

server.on("request", (req, res) => {
    let requestContent = "";

    req.on("data", (chunk) => {
        requestContent += chunk;
    });
    req.on("close", () => {
        console.log("request content:", requestContent);
    });
    if (req.method !== "POST" || req.url !== "/webhook") {
        res.writeHead(404);
        return res.end("Not Found");
    }
    res.writeHead(200);
    return res.end("OK");
});

module.exports = server;
