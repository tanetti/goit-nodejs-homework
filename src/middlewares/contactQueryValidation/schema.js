/* eslint-disable prefer-regex-literals */
const joi = require("joi");

const contactQueryValidationSchema = joi.object({
  page: joi.number().min(1).messages({
    "page.base": "Page must be a number",
    "number.min": "Page must be equal to 1 or greater",
  }),
  limit: joi.number().min(5).max(50).messages({
    "limit.base": "Limit must be a number",
    "number.min": "Limit must be equal to 5 or greater",
    "number.max": "Limit must be equal to 50 or lower",
  }),
  favorite: joi.boolean().messages({
    "boolean.base": "Favorite field must be a boolean",
  }),
});

module.exports = { contactQueryValidationSchema };
