const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  // у моделі User знаходимо користувача по id, видаляємо токен
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    status: "succes",
    code: 204,
    message: "No Content",
  });
};
module.exports = logout;
