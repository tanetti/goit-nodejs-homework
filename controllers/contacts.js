const {
  readContacts,
  //   readContactById,
  //   removeContact,
  //   writeContact,
  //   updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const data = await readContacts();

  if (!data) {
    return res.status(500).json({ message: "Data corrupted or not found" });
  }

  res.json(data);
};

const getContactById = async (req, res, next) => {
  res.json({ message: "template message" });
};

const addContact = async (req, res, next) => {
  res.json({ message: "template message" });
};

const deleteContactById = async (req, res, next) => {
  res.json({ message: "template message" });
};

const changeContactById = async (req, res, next) => {
  res.json({ message: "template message" });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
};
