/* eslint-disable no-undef */
const httpMocks = require("node-mocks-http");
const { loginUserController } = require("../controllers/users");
const bcrypt = require("bcrypt");
const User = require("../models/users/schema");

describe("Login controller tests", () => {
  test("Login normal flow result test", async () => {
    const _id = "sgdsgsdh587sd5h87sd5h78";
    const email = "mail@mail.com";
    const password = "123456789aA";
    const avatarURL = "avatars/sgdsgsdh587sd5h87sd5h78.jpg";

    const mReq = {
      protocol: "http",
      headers: { host: "localhost:8822" },
      body: {
        email,
        password,
      },
    };
    const mRes = httpMocks.createResponse();

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => ({
      _id,
      email,
      password: await bcrypt.hash(password, 8),
      token: null,
      subscription: "starter",
      avatarURL,
    }));

    jest
      .spyOn(User, "findByIdAndUpdate")
      .mockImplementationOnce(async () => ({}));

    await loginUserController(mReq, mRes);

    const {
      code,
      result: { token, user },
    } = mRes._getJSONData();

    expect(mRes.statusCode).toBe(200);
    expect(code).toBe("login-success");
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(user.email).toBeDefined();
    expect(typeof user.email).toBe("string");
    expect(user.subscription).toBeDefined();
    expect(typeof user.subscription).toBe("string");
    expect(user.avatarURL).toBeDefined();
    expect(typeof user.avatarURL).toBe("string");
  });

  test("Login abnormal flow result test (no user with specified ID was found)", async () => {
    const email = "mail@mail.com";
    const password = "123456789aA";

    const mReq = {
      protocol: "http",
      headers: { host: "localhost:8822" },
      body: {
        email,
        password,
      },
    };
    const mRes = httpMocks.createResponse();

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => null);

    await loginUserController(mReq, mRes);

    const { code, message } = mRes._getJSONData();

    expect(mRes.statusCode).toBe(401);
    expect(code).toBe("login-error");
    expect(message).toBe(`No user was found with Email: ${email}`);
  });

  test("Login abnormal flow result test (wrong user's password specified)", async () => {
    const _id = "sgdsgsdh587sd5h87sd5h78";
    const email = "mail@mail.com";
    const password = "123456789aA";
    const wrongPassword = "123456789aAAAA";
    const avatarURL = "avatars/sgdsgsdh587sd5h87sd5h78.jpg";

    const mReq = {
      protocol: "http",
      headers: { host: "localhost:8822" },
      body: {
        email,
        password,
      },
    };
    const mRes = httpMocks.createResponse();

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => ({
      _id,
      email,
      password: await bcrypt.hash(wrongPassword, 8),
      token: null,
      subscription: "starter",
      avatarURL,
    }));

    await loginUserController(mReq, mRes);

    const { code, message } = mRes._getJSONData();

    expect(mRes.statusCode).toBe(401);
    expect(code).toBe("login-error");
    expect(message).toBe("Wrong password");
  });
});
