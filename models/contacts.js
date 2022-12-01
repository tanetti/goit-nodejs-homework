const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const readContacts = async () => {
  try {
    const fileData = await fs.readFile(contactsPath);
    return JSON.parse(fileData.toString());
  } catch (error) {
    console.warn("\x1B[31m " + error);
    return { error };
  }
};

const readContactById = async (contactId) => {
  try {
    const fileData = await fs.readFile(contactsPath);
    const contactsData = JSON.parse(fileData.toString());

    return contactsData.find(({ id }) => id === contactId);
  } catch (error) {
    console.warn("\x1B[31m " + error);
    return { error };
  }
};

const writeContact = async (body) => {};

const removeContact = async (contactId) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  readContacts,
  readContactById,
  removeContact,
  writeContact,
  updateContact,
};
