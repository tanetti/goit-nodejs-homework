const express = require("express");
const router = new express.Router();

const {
  usersBodyValidation,
} = require("../middlewares/usersBodyValidation/validation");

const {
  signupUserController,
  loginUserController,
} = require("../controllers/users");

router.post("/signup", usersBodyValidation, signupUserController);
router.post("/login", usersBodyValidation, loginUserController);

module.exports = router;
