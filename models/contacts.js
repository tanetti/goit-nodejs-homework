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

  if (!contactToRemove) {
    return { error: "no-contact" };
  }

  const dataToWrite = contactsData.filter(({ id }) => id !== contactId);

  const result =
    (await writeContactsData(contactsPath, dataToWrite)) ?? contactToRemove;

  return result;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  if (!name || !email || !phone) {
    return { error: "no-changes" };
  }

  const contactsData = await readContactsData(contactsPath);

  if (contactsData?.error) {
    return contactsData;
  }

  const contactToUpdate = contactsData.find(({ id }) => id === contactId);

  if (!contactToUpdate) {
    return { error: "no-contact" };
  }

  const updatedContact = {
    ...contactToUpdate,
    name,
    email,
    phone,
  };

  const dataToWrite = [
    ...contactsData.filter(({ id }) => id !== contactId),
    updatedContact,
  ].sort((a, b) => parseInt(a.id) - parseInt(b.id));

  const result =
    (await writeContactsData(contactsPath, dataToWrite)) ?? updatedContact;

  return result;
};

module.exports = {
  readContacts,
  readContactById,
  writeContact,
  removeContact,
  updateContact,
};
