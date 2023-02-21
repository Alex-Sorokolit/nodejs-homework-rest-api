const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// отримуємо рядок підключення  до бази
dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

// підключення до бази даних
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
