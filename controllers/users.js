const { signupUserModel, loginUserModel } = require("../models/users/users");

const signupUserController = async (req, res) => {
  const result = await signupUserModel(req.body);

  if (result?.error && result?.error.code === 11000) {
    return res
      .status(409)
      .json({ code: "signup-error", message: "Email in use" });
  } else if (result?.error) {
    return res
      .status(400)
      .json({ code: "signup-error", message: result.error });
  }

  const { email, subscription } = result;

  res
    .status(201)
    .json({ code: "signup-success", user: { email, subscription } });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUserModel(email, password);

  if (result?.error) {
    return res.status(401).json({ code: "login-error", message: result.error });
  }

  res.json({ code: "login-success", result });
};

module.exports = {
  signupUserController,
  loginUserController,
};
