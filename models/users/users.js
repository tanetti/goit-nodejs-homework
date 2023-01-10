const User = require("./schema");

const signupUserModel = async (userData) => {
  const user = new User(userData);

  const result = await user.save();

  return result;
};

const findUserByEmailModel = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

const findUserByIdModel = async (_id) => {
  const user = await User.findById(_id);

  return user;
};

const updateUserModel = async (_id, body) => {
  await User.findByIdAndUpdate(_id, body);
};

module.exports = {
  signupUserModel,
  findUserByEmailModel,
  findUserByIdModel,
  updateUserModel,
};
