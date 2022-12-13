/* eslint-disable prefer-regex-literals */
const joi = require("joi");

const contactBodyPostPutValidationSchema = joi.object({
  name: joi
    .string()
    .pattern(new RegExp("^[ a-zA-Z-]+$"))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.base": "Name field must be a string",
      "string.pattern.base": "Incorrect format of Name field",
      "string.min": "Name field must contain 2 or above symbols",
      "string.max": "Name field must contain 20 or less symbols",
      "any.required": "Name field was not specified",
    }),
  email: joi.string().email().required().messages({
    "string.base": "Email field must be a string",
    "string.email": "Incorrect format of Email field",
    "any.required": "Email field was not specified",
  }),
  phone: joi
    .string()
    .pattern(new RegExp("^[ 0-9()-]+$"))
    .min(5)
    .max(18)
    .required()
    .messages({
      "string.base": "Phone number field must be a string",
      "string.pattern.base": "Incorrect format of Phone number field",
      "string.min": "Phone number field must contain 5 or above symbols",
      "string.max": "Phone number field must contain 18 or less symbols",
      "any.required": "Phone number field was not specified",
    }),
  favorite: joi.boolean().messages({
    "boolean.base": "Favorite field must be a boolean",
  }),
});

const contactBodyPatchValidationSchema = joi.object({
  name: joi
    .string()
    .pattern(new RegExp("^[ a-zA-Z-]+$"))
    .min(2)
    .max(20)
    .messages({
      "string.base": "Name field must be a string",
      "string.pattern.base": "Incorrect format of Name field",
      "string.min": "Name field must contain 2 or above symbols",
      "string.max": "Name field must contain 20 or less symbols",
    }),
  email: joi.string().email().messages({
    "string.base": "Email field must be a string",
    "string.email": "Incorrect format of Email field",
  }),
  phone: joi
    .string()
    .pattern(new RegExp("^[ 0-9()-]+$"))
    .min(5)
    .max(18)
    .messages({
      "string.base": "Phone number field must be a string",
      "string.pattern.base": "Incorrect format of Phone number field",
      "string.min": "Phone number field must contain 5 or above symbols",
      "string.max": "Phone number field must contain 18 or less symbols",
    }),
  favorite: joi.boolean().messages({
    "boolean.base": "Favorite field must be a boolean",
  }),
});

const contactFavoriteBodyPatchValidationSchema = joi.object({
  favorite: joi.boolean().required().messages({
    "boolean.base": "Favorite field must be a boolean",
    "any.required": "Favorite field was not specified",
  }),
});

module.exports = {
  contactBodyPostPutValidationSchema,
  contactBodyPatchValidationSchema,
  contactFavoriteBodyPatchValidationSchema,
};
