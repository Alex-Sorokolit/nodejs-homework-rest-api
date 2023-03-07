// Schema
const { handleMongooseError } = require("../helpers");
const { mongoose, Schema, model } = require("mongoose");
// Joi видає error який може бути або undefined або ValidationError object
const Joi = require("joi");

mongoose.set("strictQuery", true);

// регулярний вираз для email
// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// схема даних які потрапляють у базу даних
const userSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Set user name"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true, strictQuery: false }
);

// валідація Joy
const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});
const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).pattern(emailRegexp).required(),
});

const userSchemas = {
  joiRegisterSchema,
  joiLoginSchema,
};

// helper який змінює статус помилки
userSchema.post("save", handleMongooseError);

// Model
const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas,
};
