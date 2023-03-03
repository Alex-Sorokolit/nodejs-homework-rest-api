// Controller
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // без цього конфіга SECRET_KEY === andefined
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  // перевіряємо чи є такий користувач у базі
  const user = await User.findOne({ email });
  // якщо його немає, то викидаємо помилку
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  // якщо є такий користувач то порівнюємо пароль
  const passwordCompare = await bcrypt.compare(password, user.password);
  // якщо пароль не співпадає, то викидаємо помилку
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  // Якщо співпадають, створюємо токен
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // записуємо токен в базу (при логіні оновлюємо користувача)
  await User.findByIdAndUpdate(user._id, { token });
  // і відправляємо його на фронтенд
  res.json({
    token,
  });
};
module.exports = login;
