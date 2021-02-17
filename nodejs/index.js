const server = require("http").createServer();

server.on("request", (req, res) => {
    let requestContent = "";

    req.on("data", (chunk) => {
        console.log("data");
        requestContent += chunk;
    });
    req.on("aborted", (err) => {
        console.error("aborted:", err);
    });
    req.on("close", () => {
        console.log("req closed");
        console.log("method:", req.method);
        console.log("url:", req.url);
        console.log("raw headers:", req.rawHeaders);
        console.log("request content:", requestContent);
    });
    res.writeHead(200);
    return res.end();
});

module.exports = server;
