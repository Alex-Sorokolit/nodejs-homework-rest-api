const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(joiSchema), ctrl.add);
router.delete("/:contactId", ctrl.remove);
router.put("/:contactId", validateBody(joiSchema), ctrl.update);
router.patch(
  "/:contactId/favorite",
  validateBody(favoriteJoiSchema),
  ctrl.updateFavorite
);

module.exports = router;
