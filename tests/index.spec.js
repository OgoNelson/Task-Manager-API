const request = require("supertest");
const app = require("../main");

describe("Home route", () => {
  it("should return Task Manager API", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Task Manager API");
  });
});
