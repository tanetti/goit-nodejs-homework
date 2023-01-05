const {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  deleteContactModel,
  changeContactModel,
} = require("../models/contacts/contacts");

const parseBoolean = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;

  return null;
};

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 0, favorite = null } = req.query;

  const formattedPage = parseInt(page);
  const formattedLimit = parseInt(limit);
  const formattedFavorite = favorite ? parseBoolean(favorite) : null;

  const contacts = await getContactsModel(owner, {
    page: formattedPage,
    limit: formattedLimit,
    favorite: formattedFavorite,
  });

  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    params: { contactId },
  } = req;

  const contact = await getContactByIdModel(contactId, owner);

  if (!contact) {
    return res.status(404).json({
      code: "not-found",
      message: `Contact with id "${contactId}" was not found`,
    });
  }

  res.json(contact);
};

const addContactController = async (req, res) => {
  req.body.owner = req.user._id;

  const result = await addContactModel(req.body);

  res.status(201).json({ code: "add-success", message: result });
};

const deleteContactByIdController = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    params: { contactId },
  } = req;

  const result = await deleteContactModel(contactId, owner);

  if (!result) {
    return res.status(404).json({
      code: "not-found",
      message: `Contact with id "${contactId}" was not found`,
    });
  }

  res.json({ code: "remove-success", message: result });
};

const changeContactByIdController = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    body,
    params: { contactId },
  } = req;

  const result = await changeContactModel(contactId, owner, body);

  if (result?.error) {
    if (result.error === "no-contact") {
      return res.status(404).json({
        code: "not-found",
        message: `Contact with id "${contactId}" was not found`,
      });
    }

    return res.status(500).json({
      code: "storage-failure",
      message: "Data storage corrupted or not available",
    });
  }

  res.json({ code: "change-success", message: result });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  changeContactByIdController,
};
