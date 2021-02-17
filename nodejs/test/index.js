const request = require("supertest"),
    webhook = require("../index.js");

console.log = jest.fn();
console.error = jest.fn();

process.env.WEBHOOK_SECRET = "secret";

test("should return a 404 for a GET to /", () => {
    return request(webhook)
        .get("/")
        .expect(404)
        .expect("Not Found");
});

test("should return a 404 for a POST to /", () => {
    return request(webhook)
        .post("/")
        .expect(404)
        .expect("Not Found");
});

test("should return a 400 for POSTing invalid Json to /webhook", () => {
    const hashedBody = "1b2c16b75bd2a870c114153ccda5bcfca63314bc722fa160d690de133ccbb9db";

    return request(webhook)
        .post("/webhook")
        .set({"X-Hub-Signature-256": hashedBody})
        .send("data")
        .expect(400)
        .expect("Bad json");
});

test("should return a 200 for a POST to /webhook", () => {
    const hashedBody = "f5345e764d0dd7c6553bb7a6580d7f67777b03ed1ef5b8d0a7455fc006c5c7be";

    return request(webhook)
        .post("/webhook")
        .set({"X-Hub-Signature-256": hashedBody})
        .send({
            data: "content",
        })
        .expect(200)
        .expect("OK");
});

test("should return a 401 if the request doesn't have the right header", () => {
    return request(webhook)
        .post("/webhook")
        .expect(401)
        .expect("Unauthorized");
});

test("should return a 401 if the secret was invalid", () => {
    const hashedBody = "cab4ba4116de8c5f0d9c518e6135b76caebeab057f13c2274f0081380108a4fd";

    return request(webhook)
        .post("/webhook")
        .set({"X-Hub-Signature-256": hashedBody})
        .send({
            data: "content",
        })
        .expect(401)
        .expect("Unauthorized");
});

test("should return a 401 if the data was invalid", () => {
    const hashedBody = "bdb37a869e95710324a5f884f6e5e678f496d738f955fc048e33bbf1992ebf37";

    return request(webhook)
        .post("/webhook")
        .set({"X-Hub-Signature-256": hashedBody})
        .send({
            data: "content",
        })
        .expect(401)
        .expect("Unauthorized");
});

test("should return a 401 if the hashed data is not the right length", () => {
    const hashedBody = "f5345e764d0dd7c6553bb7a6580d7f67777b03ed1ef5b8d0a7455fc006c5c7be1";

    return request(webhook)
        .post("/webhook")
        .set({"X-Hub-Signature-256": hashedBody})
        .send({
            data: "content",
        })
        .expect(401)
        .expect("Unauthorized");
});
