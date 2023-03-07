const express = require("express");
const contactsRouter = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validateBody, isValidId } = require("../../middlewares");
const {
  contactSchemas: { joiContactsSchema, joiFavoriteSchema },
} = require("../../models");
const { authenticate } = require("../../middlewares");

contactsRouter.get("/", authenticate, ctrl.getAll);
contactsRouter.get("/:contactId", authenticate, isValidId, ctrl.getById);
contactsRouter.post(
  "/",
  authenticate,
  validateBody(joiContactsSchema),
  ctrl.add
);
contactsRouter.delete("/:contactId", authenticate, isValidId, ctrl.remove);
contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(joiContactsSchema),
  ctrl.update
);
contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(joiFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = contactsRouter;
