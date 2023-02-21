const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// middelwares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// всі запити які починаються з api/contacts шукати в роутері
app.use("/api/contacts", contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// відловлювач помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
