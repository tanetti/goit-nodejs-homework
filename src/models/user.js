const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const sendUserVerificationEmailMessage = require("../services/sendEmailMessage");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.pre("save", function () {
  this.avatarURL = gravatar.url(this.email, {
    protocol: "http",
    s: "250",
    d: "identicon",
  });
});

userSchema.post("save", async function () {
  await sendUserVerificationEmailMessage(this.email, this.verificationToken);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
