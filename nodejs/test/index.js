const request = require("supertest"),
    webhook = require("../index.js");

console.log = jest.fn();
console.error = jest.fn();

test("should return a 200 for a GET", () => {
    return request(webhook)
        .get("/")
        .expect(200)
        .expect("OK");
});

test("should return a 200 for a POST", () => {
    return request(webhook)
        .post("/")
        .send({
            data: "data",
        })
        .expect(200)
        .expect("OK");
});
