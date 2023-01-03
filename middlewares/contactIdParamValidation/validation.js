const { contactIdValidationSchema } = require("./schema");

const contactIdParamValidation = (req, res, next) => {
  const { contactId } = req.params;

  const error = contactIdValidationSchema.validate(contactId).error;

  if (error) {
    const [firstError] = error.details;

    return res
      .status(400)
      .json({ code: "validation-error", message: firstError.message });
  }

  next();
};

module.exports = { contactIdParamValidation };
