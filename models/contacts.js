const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const readContacts = async () => {
  try {
    const fileData = await fs.readFile(contactsPath);
    return JSON.parse(fileData.toString());
  } catch (error) {
    console.warn("\x1B[31m " + error);
  }
};

const readContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const writeContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  readContacts,
  readContactById,
  removeContact,
  writeContact,
  updateContact,
};
