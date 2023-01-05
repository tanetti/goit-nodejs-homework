const express = require("express");
const router = new express.Router();

const {
  contactBodyValidation,
} = require("../middlewares/contactBodyValidation/validation");

const {
  contactIdParamValidation,
} = require("../middlewares/contactIdParamValidation/validation");

const contactQueryValidation = require("../middlewares/contactQueryValidation/validation");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  changeContactByIdController,
} = require("../controllers/contacts");

router.get("/", contactQueryValidation, getContactsController);
router.get("/:contactId", contactIdParamValidation, getContactByIdController);
router.post("/", contactBodyValidation, addContactController);
router.delete(
  "/:contactId",
  contactIdParamValidation,
  deleteContactByIdController
);
router.put(
  "/:contactId",
  contactIdParamValidation,
  contactBodyValidation,
  changeContactByIdController
);
router.patch(
  "/:contactId",
  contactIdParamValidation,
  contactBodyValidation,
  changeContactByIdController
);
router.patch(
  "/:contactId/favorite",
  contactIdParamValidation,
  contactBodyValidation,
  changeContactByIdController
);

module.exports = router;
