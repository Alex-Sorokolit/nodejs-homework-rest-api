const { HttpError } = require("../helpers");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // чомусь без цього конфіга SECRET_KEY === andefined
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  // дістаємо заголовок із запиту
  const { authorization = "" } = req.headers;
  // заголовок розділяємо на два слова
  const [bearer, token] = authorization.split(" ");

  // перевіряємо чи Bearer
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  // якщо ключ не той або прострочений токен, буде викинута помилка тому обгортаємо в try catch
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    // перевіряємо чи є такий юзер в базі
    const user = await User.findById(id);

    // помилка якщо немає користувача або в нього немає токена або токер який в нього є не дорівнює тому що прислали
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    // якщо токен валідний - додаємо юзера у об'єкт реквест і відправляємо далі
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};
module.exports = authenticate;

/*
Дістає токен із заголовка і:
1. Перевіряє валідність токена (чи ми його видали і чи він ще не прострочений).
2. Дістає id із токена, знаходить користувача в базі по id і прикріплює його до запиту (req.user).
*/

/*
1. Дістати із заголовків запиту вміст заголовка Autorization.
2. Розділити його на 2 слова: Bearer і токен.
3. Перевірити чи перше слово "Bearer".
4. Перевірити валідність другого слова (токен).
5. Якщо токен валідний - дістаємо з нього id і знаходимо користувача з таким id.
6. Якщо користувача з таким id знайшли в базі - його потрібно прикріпити до запиту (об'єкт req). 
*/
