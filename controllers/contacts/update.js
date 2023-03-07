const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const update = async (req, res) => {
  const { contactId } = req.params;
  // new: true поверне оновлений об'єкт
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = update;
