// імпортуємо sundgrid
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// беремо ключ
const { SENDGRID_API_KEY } = process.env;

// Об'єкт який буде відправляти пошту. Передаємо йому ключ
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "sorokolital@gmail.com" };

  // eslint-disable-next-line no-useless-catch
  try {
    // відправляємо лист
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// імпортуємо sundgrid
// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// // беремо ключ
// const { SENDGRID_API_KEY } = process.env;

// // Об'єкт який буде відправляти пошту. Передаємо йому ключ
// sgMail.setApiKey(SENDGRID_API_KEY);

// // Створюємо лист
// const email = {
//   to: "yahif63974@terkoer.com",
//   from: "sorokolital@gmail.com",
//   subject: "New request from website",
//   html: "<p>Confirm your registration</p>",
// };

// // відправляємо лист
// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((erro) => console.log(error.message));
