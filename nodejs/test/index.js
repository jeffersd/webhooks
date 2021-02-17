const request = require("supertest"),
    webhook = require("../index.js");

console.log = jest.fn();
console.error = jest.fn();

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
    return request(webhook)
        .post("/webhook")
        .send("data")
        .expect(400)
        .expect("Bad json");
});

test("should return a 200 for a POST to /webhook", () => {
    return request(webhook)
        .post("/webhook")
        .send({
            data: "data",
        })
        .expect(200)
        .expect("OK");
});
