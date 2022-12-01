/* eslint-disable prefer-regex-literals */
const joi = require("joi");

const contactValidationSchema = joi.object({
  name: joi
    .string()
    .pattern(new RegExp("^[ a-zA-Z-]+$"))
    .min(2)
    .max(40)
    .required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(new RegExp("^[ 0-9()-]+$"))
    .min(5)
    .max(18)
    .required(),
});

module.exports = {
  contactValidationSchema,
};
