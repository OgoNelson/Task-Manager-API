const request = require("supertest");
const app = require("../main");
const { connect } = require("./database");
const UserModel = require("../users/users.model");

describe("Task Manager API", () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await connect(); // connect to the test database

    // create a user
    await UserModel.create({
      username: "stan",
      password: "password",
    });

    // login user
    const response = await request(app).post("/api/v1/users/login").send({
      username: "stan",
      password: "password",
    });

    token = response.body.data.token;
  });

  afterEach(async () => {
    await conn.cleanup(); // clear the database after each test
  });

  afterAll(async () => {
    await conn.disconnect(); // close the connection to the test database
  });

  it("should create tasks successfully", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .set("authorization", `Bearer ${token}`)
      .send({
        title: "mop the sitting room",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });

  it("should fail to create tasks if title is not passed", async () => {
    const response = await request(app)
      .post("/api/v1/tasks")
      .set("authorization", `Bearer ${token}`)
      .send({
        status: "completed",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("message", "Invalid payload");
  });
});

// Increase timeout for all tests in a file
jest.setTimeout(10000);
