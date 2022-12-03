const express = require("express");
const router = new express.Router();

const {
  contactBodyValidation,
} = require("../../middlewares/contactBodyValidation/validation");

const {
  contactIdParamValidation,
} = require("../../middlewares/contactIdParamValidation/validation");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
} = require("../../controllers/contacts");

router.get("/", getContacts);
router.get("/:contactId", contactIdParamValidation, getContactById);
router.post("/", contactBodyValidation, addContact);
router.delete("/:contactId", contactIdParamValidation, deleteContactById);
router.put(
  "/:contactId",
  contactIdParamValidation,
  contactBodyValidation,
  changeContactById
);
router.patch(
  "/:contactId",
  contactIdParamValidation,
  contactBodyValidation,
  changeContactById
);

module.exports = router;
