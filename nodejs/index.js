const server = require("http").createServer(),
    crypto = require("crypto");

function isRequestPayloadValid (hashedPayload, requestPayload) {
    const ourHash = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET)
                       .update(requestPayload)
                       .digest(),
        bufferHashedPayload = Buffer.from(hashedPayload, "hex");

    return hashedPayload.length === 64 &&
        ourHash.length === bufferHashedPayload.length &&
        crypto.timingSafeEqual(ourHash, bufferHashedPayload);
}

server.on("request", (req, res) => {
    let requestPayload = "";

    if (req.method !== "POST" || req.url !== "/webhook") {
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
                res.writeHead(400);
                return res.end("Bad json");
            }
            res.writeHead(200);
            return res.end("OK");
        }
        res.writeHead(401)
        return res.end("Unauthorized");
    });
});

module.exports = server;
