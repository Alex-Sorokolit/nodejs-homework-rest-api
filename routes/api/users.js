// Rout
const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const usersRouter = express.Router();

// отримання поточного користувача
usersRouter.get("/current", authenticate, ctrl.getCurrent);

// Підтвердження email
usersRouter.get("/verify/:verificationToken", ctrl.verifyEmail);
// заміна аватарки
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updataAvatar
);

module.exports = usersRouter;
