const {
  readContacts,
  readContactById,
  writeContact,
  removeContact,
  //   updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await readContacts();

  if (contacts?.error) {
    return res
      .status(500)
      .json({ code: "data-corrupted", message: "Data corrupted or not found" });
  }

  if (!contacts.length) {
    return res
      .status(404)
      .json({ code: "data-empty", message: "Contacts data is empty for now" });
  }

  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  const contact = await readContactById(contactId);

  if (contact?.error) {
    return res
      .status(500)
      .json({ code: "data-corrupted", message: "Data corrupted or not found" });
  }

  if (!contact) {
    return res.status(404).json({
      code: "not-found",
      message: `Contact with id "${contactId}" was not found`,
    });
  }

  res.json(contact);
};

const addContact = async (req, res, next) => {
  const result = await writeContact(req.body);

  if (result?.error) {
    return res.status(500).json({
      code: "storage-failure",
      message: "Data storage corrupted or not available",
    });
  }

  res.json({ code: "add-success", message: result });
};

const deleteContactById = async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  const result = await removeContact(contactId);

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

  res.json({ code: "remove-success", message: result });
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
