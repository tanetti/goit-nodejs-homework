const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();

const {
  signupUserModel,
  findUserByEmailModel,
  findUserByIdModel,
  updateUserModel,
} = require("../models/users/users");

const signupUserController = async (req, res) => {
  try {
    const result = await signupUserModel(req.body);

    const { email, subscription } = result;

    res
      .status(201)
      .json({ code: "signup-success", user: { email, subscription } });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ code: "signup-error", message: "Email in use" });
    }

    return res
      .status(400)
      .json({ code: "signup-error", message: error.message });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmailModel(email);

    if (!user) {
      throw new Error(`No user was found with Email: ${email}`);
    }

    const isUsersPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isUsersPasswordMatch) {
      throw new Error("Wrong password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    await updateUserModel(user._id, { token });

    let usersAvatarURL = null;

    if (user.avatarURL.startsWith("http")) {
      usersAvatarURL = user.avatarURL;
    } else {
      const avatarsPath = `${req.protocol}://${req.headers.host}/avatars/`;

      usersAvatarURL = `${avatarsPath}${user.avatarURL}`;
    }

    const result = {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: usersAvatarURL,
      },
    };

    res.json({ code: "login-success", result });
  } catch (error) {
    return res
      .status(401)
      .json({ code: "login-error", message: error.message });
  }
};

const logoutUserController = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await findUserByIdModel(_id);

    if (!user) {
      throw new Error(`No user was found with ID: ${_id}`);
    }

    await updateUserModel(user._id, { token: null });

    res.status(204).json({});
  } catch (error) {
    return res
      .status(400)
      .json({ code: "logout-error", message: error.message });
  }
};

const currentUserController = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ code: "current-user", user: { email, subscription } });
};

const avatarUpdateController = async (req, res) => {
  const { _id } = req.user;
  const currentUserId = _id.toString();
  const tempPath = path.resolve("./temp");
  const avatarsPath = path.resolve("./public/avatars");
  const tempAvatarPath = `${tempPath}/${currentUserId}.jpg`;
  const resultAvatarPath = `${avatarsPath}/${currentUserId}.jpg`;

  try {
    const tempAvatar = await jimp.read(tempAvatarPath);

    await tempAvatar.resize(250, 250).quality(80).writeAsync(resultAvatarPath);

    await fs.unlink(tempAvatarPath);

    const avatarsPath = `${req.protocol}://${req.headers.host}/avatars/`;
    const avatarFile = `${currentUserId}.jpg`;

    await updateUserModel(_id, { avatarURL: avatarFile });

    res.json({
      code: "avatar-update-success",
      avatarURL: `${avatarsPath}${avatarFile}`,
    });
  } catch (error) {
    return res.status(500).json({
      code: "avatar-update-error",
      message: "Error while avatar processing",
    });
  }
};

const updateUserSubscriptionController = async (req, res) => {
  const {
    user: { _id },
    body,
  } = req;

  try {
    const user = await findUserByIdModel(_id);

    if (!user) {
      throw new Error(`No user was found with ID: ${_id}`);
    }

    await updateUserModel(_id, body);

    const result = { email: user.email, subscription: body.subscription };

    res.json({
      code: "update-subscription-success",
      result,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ code: "update-subscription-error", message: error.message });
  }
};

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  avatarUpdateController,
  updateUserSubscriptionController,
};
