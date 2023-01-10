const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

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
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.pre("save", async function () {
  this.avatarURL = gravatar.url(this.email, {
    protocol: "http",
    s: "250",
    d: "identicon",
  });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
