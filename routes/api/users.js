// Rout
const express = require("express");
const { authenticate } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, ctrl.getCurrent);

module.exports = usersRouter;
