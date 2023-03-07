const errorMessageList = {
  400: "Bad Request", // введені дані не пройшли валідацію joi або mongoose
  401: "Unauthorized", // не авторизований
  402: "Forbiden", // немає прав доступу
  403: "Not found", // не знайдено в базі або невірний шлях
  404: "Conflict", // при реєстрації вказує на те що такий email вже існує в базі
};

const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
