const { Schema, model } = require("mongoose");
const Joi = require("joi");

// схема даних які потрапляють у базу даних
const contactSchema = Schema(
  {
    name: { type: String, require: [true, "Set name for contact"] },
    email: { type: String, require: true },
    phone: {
      type: String,

      require: true,
    },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

// валідація Joy
const joiSchema = Joi.object({
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

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contacts = model("contacts", contactSchema);

module.exports = {
  Contacts,
  joiSchema,
  favoriteJoiSchema,
};
