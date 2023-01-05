const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./schema");

const signupUserModel = async (userData) => {
  try {
    const user = new User(userData);

    const result = await user.save();

    return result;
  } catch (error) {
    return { error };
  }
};

const loginUserModel = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { error: `No user was found with Email: ${email}` };
    }

    const usersPasswordMatch = await bcrypt.compare(password, user.password);

    if (!usersPasswordMatch) {
      return { error: "Wrong password" };
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    await user.updateOne({ token });

    return {
      token,
      user: { email: user.email, subscription: user.subscription },
    };
  } catch (error) {
    return { error };
  }
};

const findUserByIdModel = async (_id) => {
  const user = await User.findById(_id);

  if (!user) {
    throw new Error(`No user with ID: "${_id}" was found`);
  }

  return user;
};

module.exports = {
  signupUserModel,
  loginUserModel,
  findUserByIdModel,
};
