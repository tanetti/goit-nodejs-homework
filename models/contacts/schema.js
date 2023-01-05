const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name was not specified"],
  },
  email: {
    type: String,
    required: [true, "Email was not specified"],
  },
  phone: {
    type: String,
    required: [true, "Phone number was not specified"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
