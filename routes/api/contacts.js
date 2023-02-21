const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contactsSchema");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(schema), ctrl.add);
router.delete("/:contactId", ctrl.remove);
router.put("/:contactId", validateBody(schema), ctrl.update);

module.exports = router;
