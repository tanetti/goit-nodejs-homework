const { contactQueryValidationSchema } = require("./schema");

const contactQueryValidation = (req, res, next) => {
  const { query } = req;

  const error = contactQueryValidationSchema.validate(query).error;

  if (error) {
    const [firstError] = error.details;

    return res
      .status(400)
      .json({ code: "validation-error", message: firstError.message });
  }

  next();
};

module.exports = contactQueryValidation;
