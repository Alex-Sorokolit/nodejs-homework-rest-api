const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// схема даних які потрапляють у базу даних
// остання перевірка перед передачею даних у базу
const contactSchema = new Schema(
  {
    name: { type: String, require: [true, "Set name for contact"] },
    email: { type: String, require: [true, "Set email"] },
    phone: { type: String, require: [true, "Set phone"] },
    favorite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true }, // тут буде зберігатися id користувача який додав контакт у базу, ref це колекція
  },
  { versionKey: false, timestamps: true }
);

// валідація Joy
const joiContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().length(14).required(),
  favorite: Joi.boolean(),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// helper який змінює статус помилки
contactSchema.post("save", handleMongooseError);

// Model
const Contact = model("contact", contactSchema);
const contactSchemas = {
  joiContactsSchema,
  joiFavoriteSchema,
};
module.exports = {
  Contact,
  contactSchemas,
};
