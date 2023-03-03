// mongoose видає помилку без статусу, її зловить try catch у ctrlWrapper і передасть в App
//  там присвоється статус 500 який не підходить.
// Якщо виникне помилка валідації спрацює ця функція
const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  // якщо email вже присутній в базі то помилка 409
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};
module.exports = handleMongooseError;
