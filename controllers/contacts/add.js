const { Contact } = require("../../models");

const add = async (req, res) => {
  // дістаємо id із об'єкта запиту і перейменовуємо в owner
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner }); // додаємо owner до контакту, щоб знати хто його створив і кому його повертати
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};
module.exports = add;
