// Rout
const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  userSchemas: { joiRegisterSchema, joiLoginSchema },
} = require("../../models");

const authRouter = express.Router();

// Registration  (signup)
authRouter.post("/register", validateBody(joiRegisterSchema), ctrl.register);

// LogIn     (signin)
authRouter.post("/login", validateBody(joiLoginSchema), ctrl.login);

// LogOut
// розлогінитись може тільки той хто залогінений, тому додаємо authenticate
authRouter.post("/logout", authenticate, ctrl.logout);

module.exports = authRouter;
