const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
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
