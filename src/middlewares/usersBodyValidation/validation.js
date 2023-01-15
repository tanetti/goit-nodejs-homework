const {
  usersBodyValidationSchema,
  usersSubscriptionBodyValidationSchema,
  usersBodyResendVerificationEmailValidationSchema,
} = require("./schema");

const usersBodyValidation = (req, res, next) => {
  const requestMethod = req.method;
  const requestPath = req.path;

  let error = null;

  if (requestMethod === "POST" && requestPath !== "/verify/") {
    error = usersBodyValidationSchema.validate(req.body).error;
  }

  if (requestMethod === "POST" && requestPath === "/verify/") {
    error = usersBodyResendVerificationEmailValidationSchema.validate(
      req.body
    ).error;
  }

  if (requestMethod === "PATCH") {
    error = usersSubscriptionBodyValidationSchema.validate(req.body).error;
  }

  if (error) {
    const [firstError] = error.details;

    return res
      .status(400)
      .json({ code: "validation-error", message: firstError.message });
  }

  next();
};

module.exports = usersBodyValidation;
