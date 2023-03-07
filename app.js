const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const dotenv = require("dotenv");

// отримуємо рядок підключення  до бази
dotenv.config();

// middelwares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// всі запити які починаються з api/contacts шукати в роутері
app.use("/api/contacts", contactsRouter);

// обробка помилки 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// відловлювач помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
