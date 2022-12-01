const express = require("express");
const router = new express.Router();

const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
} = require("../../controllers/contacts");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", deleteContactById);
router.put("/:contactId", changeContactById);

module.exports = router;
