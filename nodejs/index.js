const server = require("http").createServer(),
    crypto = require("crypto");

function isRequestPayloadValid (hashedPayload, requestPayload) {
    const ourHash = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET)
                       .update(requestPayload)
                       .digest("hex"),
        ourBuffer = Buffer.from(`sha256=${ourHash}`),
        bufferHashedPayload = Buffer.from(hashedPayload);

    return ourBuffer.length === bufferHashedPayload.length &&
        crypto.timingSafeEqual(ourBuffer, bufferHashedPayload);
}

server.on("request", (req, res) => {
    let requestPayload = "";

    if (req.method !== "POST" || (req.url !== "/webhook" && req.url !== "/webhook/")) {
        console.log(`${req.method} ${req.url} 404`);
        res.writeHead(404);
        return res.end("Not Found");
    }

    req.on("data", (chunk) => {
        requestPayload += chunk;
    });
    req.on("end", () => {
        if (req.headers["x-hub-signature-256"] && isRequestPayloadValid(req.headers["x-hub-signature-256"], requestPayload)) {
            let parsed;

            console.log("payload:", requestPayload);
            try {
                parsed = JSON.parse(requestPayload);
            } catch (parseError) {
                console.error(parseError);
                console.log(`${req.method} ${req.url} 400`);
                res.writeHead(400);
                return res.end("Bad json");
            }
            console.log(`${req.method} ${req.url} 200`);
            res.writeHead(200);
            return res.end("OK");
        }
        console.log(`${req.method} ${req.url} 401`);
        res.writeHead(401)
        return res.end("Unauthorized");
    });
});

module.exports = server;
