const getCurrent = async (req, res) => {
  // беремо із об'єкта запиту
  const { email, name } = req.user;
  // і повертаємо
  res.json({
    email,
    name,
  });
};
module.exports = getCurrent;
