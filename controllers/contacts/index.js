const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const remove = require("./remove");
const update = require("./update");
const { ctrlWrapper } = require("../../middlewares");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
};
