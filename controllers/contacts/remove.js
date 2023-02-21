const removeContact = require("../../models/contacts");

const HttpError = require("../../middlewares");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
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
