const express = require("express");
const router = new express.Router();

const usersBodyValidation = require("../middlewares/usersBodyValidation/validation");
const authHeaderValidation = require("../middlewares/authHeaderValidation");

const {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
} = require("../controllers/users");

router.post("/signup", usersBodyValidation, signupUserController);
router.post("/login", usersBodyValidation, loginUserController);
router.post("/logout", authHeaderValidation, logoutUserController);
router.post("/current", authHeaderValidation, currentUserController);

module.exports = router;
