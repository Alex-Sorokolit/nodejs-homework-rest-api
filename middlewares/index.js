// middlware функція-проміжний запит (проміжний обробник)
const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = { validateBody, isValidId, authenticate };
