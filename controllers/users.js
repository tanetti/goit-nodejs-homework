const {
  signupUserModel,
  loginUserModel,
  resetUserTokenByIdModel,
  updateUserSubscriptionByIdModel,
} = require("../models/users/users");

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

const logoutUserController = async (req, res) => {
  try {
    await resetUserTokenByIdModel(req.user._id);

    res.status(204).json({});
  } catch (error) {
    return res
      .status(500)
      .json({ code: "logout-error", message: error.message });
  }
};

const currentUserController = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ code: "current-user", result: { email, subscription } });
};

const updateUserSubscriptionController = async (req, res) => {
  const {
    user: { _id },
    body,
  } = req;

  try {
    const result = await updateUserSubscriptionByIdModel(_id, body);

    res.json({
      code: "update-subscription-success",
      result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: "update-subscription-error", message: error.message });
  }
};

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  updateUserSubscriptionController,
};
