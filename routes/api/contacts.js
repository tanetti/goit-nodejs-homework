const express = require("express");
const router = new express.Router();

const {
  contactValidation,
} = require("../../middlewares/validation/validation");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
} = require("../../controllers/contacts");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", contactValidation, addContact);
router.delete("/:contactId", deleteContactById);
router.put("/:contactId", contactValidation, changeContactById);

module.exports = router;
