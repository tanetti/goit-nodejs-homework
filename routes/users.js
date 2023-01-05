const express = require("express");
const router = new express.Router();

const usersBodyValidation = require("../middlewares/usersBodyValidation/validation");
const authHeaderValidation = require("../middlewares/authHeaderValidation");

const {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  updateUserSubscriptionController,
} = require("../controllers/users");

router.post("/signup", usersBodyValidation, signupUserController);
router.post("/login", usersBodyValidation, loginUserController);
router.post("/logout", authHeaderValidation, logoutUserController);
router.get("/current", authHeaderValidation, currentUserController);
router.patch(
  "/",
  authHeaderValidation,
  usersBodyValidation,
  updateUserSubscriptionController
);

module.exports = router;
