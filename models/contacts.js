// const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const { makeNewId, readContactsData, writeContactsData } = require("./utils");

const readContacts = async () => {
  const contactsData = await readContactsData(contactsPath);

  return contactsData;
};

const readContactById = async (contactId) => {
  const contactsData = await readContactsData(contactsPath);

  if (contactsData?.error) return contactsData;

  return contactsData.find(({ id }) => id === contactId);
};

const writeContact = async (body) => {
  const contactsData = await readContactsData(contactsPath);

  if (contactsData?.error) {
    return contactsData;
  }

  const newContact = {
    id: makeNewId(contactsData),
    ...body,
  };

  const dataToWrite = [...contactsData, newContact];

  const result =
    (await writeContactsData(contactsPath, dataToWrite)) ?? newContact;

  return result;
};

const removeContact = async (contactId) => {
  const contactsData = await readContactsData(contactsPath);

  if (contactsData?.error) {
    return contactsData;
  }

  const contactToRemove = contactsData.find(({ id }) => id === contactId);
  console.log(contactToRemove);

  if (!contactToRemove) {
    return { error: "no-contact" };
  }

  const dataToWrite = contactsData.filter(({ id }) => id !== contactId);

  const result =
    (await writeContactsData(contactsPath, dataToWrite)) ?? contactToRemove;

  return result;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  readContacts,
  readContactById,
  writeContact,
  removeContact,
  updateContact,
};
