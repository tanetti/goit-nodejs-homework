const User = require("../models/user");

const signupUserService = async (userData) => {
  const user = new User(userData);

  const result = await user.save();

  return result;
};

const findUserByEmailService = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

const findUserByIdService = async (_id) => {
  const user = await User.findById(_id);

  return user;
};

const updateUserService = async (_id, body) => {
  await User.findByIdAndUpdate(_id, body);
};

module.exports = {
  signupUserService,
  findUserByEmailService,
  findUserByIdService,
  updateUserService,
};
