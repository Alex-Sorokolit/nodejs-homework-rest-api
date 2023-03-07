// Controller
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  // перевіряємо чи є у базі користувач з таким email
  const user = await User.findOne({ email });
  // Якщо є повертаємо помилку
  if (user) {
    throw HttpError(409, `User with ${email} already exist`);
  }

  // перед зберіганням хешуємо парль і додаємо сіль 10 (складнісь хешування)
  const hashPassword = await bcrypt.hash(password, 10);

  // Якщо немає свторюємо користувача
  const result = await User.create({ ...req.body, password: hashPassword });
  res.json({
    status: "succes",
    code: 201,
    data: {
      name: result.name,
      email: result.email,
    },
  });
};
module.exports = register;
