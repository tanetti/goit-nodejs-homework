const express = require("express");
const router = new express.Router();

const usersBodyValidation = require("../middlewares/usersBodyValidation/validation");
const authHeaderValidation = require("../middlewares/authHeaderValidation");
const avatarsUploadStorage = require("../middlewares/avatarsUploadStorage");
const generateUserVerificationToken = require("../middlewares/generateUserVerificationToken");

const {
  signupUserController,
  verifyUserController,
  resendVerificationUserEmailController,
  loginUserController,
  logoutUserController,
  currentUserController,
  avatarUpdateController,
  updateUserSubscriptionController,
} = require("../controllers/users");

router.post(
  "/signup",
  usersBodyValidation,
  generateUserVerificationToken,
  signupUserController
);
router.get("/verify/:verificationToken", verifyUserController);
router.post(
  "/verify",
  usersBodyValidation,
  resendVerificationUserEmailController
);
router.post("/login", usersBodyValidation, loginUserController);
router.post("/logout", authHeaderValidation, logoutUserController);
router.get("/current", authHeaderValidation, currentUserController);
router.patch(
  "/avatars",
  authHeaderValidation,
  avatarsUploadStorage,
  avatarUpdateController
);
router.patch(
  "/",
  authHeaderValidation,
  usersBodyValidation,
  updateUserSubscriptionController
);

module.exports = router;
