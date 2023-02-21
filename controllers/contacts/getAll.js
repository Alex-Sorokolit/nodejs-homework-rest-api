const { Contacts } = require("../../models");

const getAll = async (req, res, next) => {
  const contacts = await Contacts.find({});
  res.json({
    status: "success",
    cade: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
