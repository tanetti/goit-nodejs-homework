const { usersBodyValidationSchema } = require("./schema");

const usersBodyValidation = (req, res, next) => {
  const error = usersBodyValidationSchema.validate(req.body).error;

  if (error) {
    const [firstError] = error.details;

    return res
      .status(400)
      .json({ code: "validation-error", message: firstError.message });
  }

  next();
};

module.exports = usersBodyValidation;
