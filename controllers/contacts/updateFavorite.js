const { Contacts } = require("../../models");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateFavorite;
