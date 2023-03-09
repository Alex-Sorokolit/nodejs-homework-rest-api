const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  // шукаємо користувача з таким токеном
  const user = await User.findOne({ verificationToken });

  // якщо його немає, то викидаємо помилку
  if (!user) {
    throw HttpError(404, `Cannot find user with ${verificationToken} token`);
  } else console.log(user._id);

  // якщо є, то обновлюємо поля
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  // повертаємо відповідь
  res.json({ message: "Verify success", user: `${user._id}` });
};

module.exports = verifyEmail;
