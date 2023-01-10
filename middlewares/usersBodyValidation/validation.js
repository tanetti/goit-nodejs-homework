const {
  usersBodyValidationSchema,
  usersSubscriptionBodyValidationSchema,
} = require("./schema");

const usersBodyValidation = (req, res, next) => {
  const requestMethod = req.method;

  let error = null;

  if (requestMethod === "POST") {
    error = usersBodyValidationSchema.validate(req.body).error;
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
