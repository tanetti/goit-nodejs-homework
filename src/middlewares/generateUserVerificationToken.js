const { v4: uuidv4 } = require("uuid");

const generateUserVerificationToken = async (req, res, next) => {
  const userVerificationToken = uuidv4();

  req.body.verificationToken = userVerificationToken;

  next();
};

module.exports = generateUserVerificationToken;
