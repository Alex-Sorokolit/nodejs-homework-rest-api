const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  // якщо id не валідний, створюємо помилку
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  // якщо валідний id то йдемо далі
  next();
};

module.exports = isValidId;
