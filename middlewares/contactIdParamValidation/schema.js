/* eslint-disable prefer-regex-literals */
const joi = require("joi");

const contactIdValidationSchema = joi
  .string()
  .pattern(new RegExp("^[a-z0-9]+$"))
  .length(24)
  .required()
  .messages({
    "string.pattern.base": "Incorrect format of Contact ID",
    "string.length": "Contact ID must contain 24 symbols",
    "any.required": "Contact ID field was not specified",
  });

module.exports = { contactIdValidationSchema };
