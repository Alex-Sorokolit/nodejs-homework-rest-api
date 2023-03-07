const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  // всі параметри пошуку
  console.log(req.query);
  // дай мені page сторінку якщо на сторінці limit об'єктів

  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;

  // "-createAt -updatedAt" для того щоб не показувати їх у результаті запиту (-) значить не показувати
  // отримуємо всі контакти конкретного користувача
  // find(параметр пошуку, список полів які потрібно або не потрібно повернути, налаштування пошуку)
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip, // скільки об'єктів пропустити з початку бази
    limit, // скільки об'єктів повернути
    favorite,
  }).populate("owner", "name email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};
// якщо  потрібно повернути не тільки id а ще щось то пишуть populate("owner", список полів)
// особливий інструмент пошуку mongoose по id знайте owner в базі і поверне його
module.exports = getAll;
