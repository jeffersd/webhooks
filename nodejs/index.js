const server = require("http").createServer();

server.on("request", (req, res) => {
    let requestContent = "";

    if (req.method !== "POST" || req.url !== "/webhook") {
        res.writeHead(404);
        return res.end("Not Found");
    }

    req.on("data", (chunk) => {
        requestContent += chunk;
    });
    req.on("end", () => {
        let parsed;

        console.log("request content:", requestContent);
        try {
            parsed = JSON.parse(requestContent);
        } catch (parseError) {
            console.error(parseError);
            res.writeHead(400);
            return res.end("Bad json");
        }
        res.writeHead(200);
        return res.end("OK");
    });
});

module.exports = server;
