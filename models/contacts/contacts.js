const { Contact } = require("./schema");

const getContactsModel = async (owner) => {
  const contacts = await Contact.find(
    { owner: owner },
    { owner: false, __v: false }
  );

  return contacts;
};

const getContactByIdModel = async (contactId, owner) => {
  const contact = await Contact.findOne(
    { _id: contactId, owner },
    { owner: false, __v: false }
  );

  return contact;
};

const addContactModel = async (body) => {
  const result = await Contact.create(body);

  return result;
};

const deleteContactModel = async (contactId, owner) => {
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  });

  return result;
};

const changeContactModel = async (contactId, owner, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    }
  );

  return result;
};

module.exports = {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  deleteContactModel,
  changeContactModel,
};
