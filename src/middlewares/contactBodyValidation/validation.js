const {
  contactBodyPostPutValidationSchema,
  contactBodyPatchValidationSchema,
  contactFavoriteBodyPatchValidationSchema,
} = require("./schema");

const contactBodyValidation = (req, res, next) => {
  const requestMethod = req.method;
  const isFavoritePath = req.path.includes("favorite");

  let error = null;

  if (requestMethod === "POST" || requestMethod === "PUT") {
    error = contactBodyPostPutValidationSchema.validate(req.body).error;
  }

  if (requestMethod === "PATCH" && !isFavoritePath) {
    error = contactBodyPatchValidationSchema.validate(req.body).error;
  }

  if (requestMethod === "PATCH" && isFavoritePath) {
    error = contactFavoriteBodyPatchValidationSchema.validate(req.body).error;
  }

  if (error) {
    const [firstError] = error.details;

    return res
      .status(400)
      .json({ code: "validation-error", message: firstError.message });
  }

  next();
};

module.exports = contactBodyValidation;
