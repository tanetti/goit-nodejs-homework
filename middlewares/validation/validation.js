const { contactValidationSchema } = require("./schema");

const contactValidation = (req, res, next) => {
  const { error } = contactValidationSchema.validate(req.body);

  if (error) {
    const [firstError] = error.details;

    return res
      .status(400)
      .json({ code: "validation-error", message: firstError.message });
  }

  next();
};

module.exports = {
  contactValidation,
};
