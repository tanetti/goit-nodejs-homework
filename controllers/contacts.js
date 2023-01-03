const {
  getContactsModel,
  getContactByIdModel,
  addContactModel,
  deleteContactModel,
  changeContactModel,
} = require("../models/contacts/contacts");

const getContactsController = async (_, res) => {
  const contacts = await getContactsModel();

  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const {
    params: { contactId },
  } = req;

  const contact = await getContactByIdModel(contactId);

  if (!contact) {
    return res.status(404).json({
      code: "not-found",
      message: `Contact with id "${contactId}" was not found`,
    });
  }

  res.json(contact);
};

const addContactController = async (req, res) => {
  const result = await addContactModel(req.body);

  res.status(201).json({ code: "add-success", message: result });
};

const deleteContactByIdController = async (req, res) => {
  const {
    params: { contactId },
  } = req;

  const result = await deleteContactModel(contactId);

  if (!result) {
    return res.status(404).json({
      code: "not-found",
      message: `Contact with id "${contactId}" was not found`,
    });
  }

  res.json({ code: "remove-success", message: result });
};

const changeContactByIdController = async (req, res) => {
  const {
    body,
    params: { contactId },
  } = req;

  const result = await changeContactModel(contactId, body);

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
