const { Contacts } = require("../../models");

const { HttpError } = require("../../helpers");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
  console.log(result);
};

module.exports = remove;
