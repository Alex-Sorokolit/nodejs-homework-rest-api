// Controller
const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { email, password } = req.body;
  // перевіряємо чи є у базі користувач з таким email
  const user = await User.findOne({ email });
  // Якщо є повертаємо помилку
  if (user) {
    throw HttpError(409, `User with ${email} already exist`);
  }
  //  перед збереженням створюємо токен для верифікації користувача
  const verificationToken = v4();

  // створюємо лист
  const verifiactionMail = {
    to: email,
    subject: "Please confirm your email",
    html: `<a target="_blank" href=http://localhost:3000/api/users/verify/${verificationToken}>Click this button for confirm your email</a>`,
  };

  await sendEmail(verifiactionMail);

  // перед зберіганням хешуємо парль і додаємо сіль 10 (складнісь хешування)
  const hashPassword = await bcrypt.hash(password, 10);

  // перед збереженням додаємо рамдомний аватар (заглушку)
  const avatarURL = gravatar.url(email);

  // Якщо немає свторюємо користувача
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  res.json({
    status: "succes",
    code: 201,
    data: {
      name: result.name,
      email: result.email,
      avatarURL: result.avatarURL,
      verificationToken: result.verificationToken,
    },
  });
};
module.exports = register;
