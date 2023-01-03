const { Contact } = require("./schema");

const getContactsModel = async () => {
  const contacts = await Contact.find();

  return contacts;
};

const getContactByIdModel = async (contactId) => {
  const contact = await Contact.findById(contactId);

  return contact;
};

const addContactModel = async (body) => {
  const result = await Contact.create(body);

  return result;
};

const deleteContactModel = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);

  return result;
};

const changeContactModel = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  return result;
};

module.exports = {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  deleteContactModel,
  changeContactModel,
};
