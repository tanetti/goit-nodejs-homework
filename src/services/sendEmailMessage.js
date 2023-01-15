const sendGridMail = require("@sendgrid/mail");
require("dotenv").config();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendUserVerificationEmailMessage = async (
  userEmail,
  verificationToken
) => {
  const message = {
    from: process.env.SENDER_EMAIL,
    to: userEmail,
    subject: "Contacts API user verification",
    text: `Thank you for registration! Please verify your account ${process.env.APP_HOST}/api/users/verify/${verificationToken}`,
    html: `<p>Thank you for registration!</p><p>Please <a href="${process.env.APP_HOST}/api/users/verify/${verificationToken}">verify</a> your account</p>`,
  };

  try {
    await sendGridMail.send(message);
  } catch (error) {
    console.error(`\x1B[31m${error}`);
  }
};

module.exports = sendUserVerificationEmailMessage;
