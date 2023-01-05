const jwt = require("jsonwebtoken");
const { findUserByIdModel } = require("../models/users/users");

const authHeaderValidation = async (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res.status(401).json({
      code: "authorization-error",
      message: "Please provide an authorization header",
    });
  }

  const [tokenType, token] = authHeader.split(" ");
  if (!tokenType || tokenType !== "Bearer") {
    return res.status(401).json({
      code: "authorization-error",
      message: "Authorization token type invalid",
    });
  }
  if (!token) {
    return res.status(401).json({
      code: "authorization-error",
      message: "Please provide a valid authorization token",
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserByIdModel(_id);

    if (!user.token) {
      throw new Error("Not authorized");
    }

    if (user.token !== token) {
      throw new Error("Invalid authorization token");
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({
      code: "authorization-error",
      message: error.message,
    });
  }

  next();
};

module.exports = authHeaderValidation;
