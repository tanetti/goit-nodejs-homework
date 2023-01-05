/* eslint-disable prefer-regex-literals */
const joi = require("joi");

const usersBodyValidationSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.base": "User's Email must be a string",
    "string.email": "Incorrect format of user's Email",
    "any.required": "User's Email was not specified",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^[0-9a-zA-Z]+$"))
    .min(8)
    .required()
    .messages({
      "string.base": "User's Password must be a string",
      "string.pattern.base":
        "Incorrect format of User's Password, please provide digits and letters (uppercase or lowercase) only",
      "string.min": "User's Password must contain 8 or above symbols",
      "any.required": "User's Password was not specified",
    }),
});

module.exports = {
  usersBodyValidationSchema,
};
