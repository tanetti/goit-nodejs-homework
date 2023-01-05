const { Contact } = require("./schema");

const getContactsModel = async (owner, settings) => {
  const { page, limit, favorite } = settings;
  const skip = (page - 1) * limit;

  const query = { owner };

  if (typeof favorite === "boolean") query.favorite = favorite;

  const contacts = await Contact.find(
    query,
    { owner: false, __v: false },
    { skip, limit }
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
  }).select(["-owner", "-__v"]);

  return result;
};

const changeContactModel = async (contactId, owner, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    }
  ).select(["-owner", "-__v"]);

  return result;
};

module.exports = {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  deleteContactModel,
  changeContactModel,
};
