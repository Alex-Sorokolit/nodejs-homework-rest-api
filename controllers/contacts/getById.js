const getContactById = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    cade: 200,
    data: {
      result: contact,
    },
  });
};
module.exports = getById;