const request = require("supertest"),
    webhook = require("../index.js");

console.log = jest.fn();

test("should return a 200", () => {
    return request(webhook)
        .get("/")
        .expect(200);
});
