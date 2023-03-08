const { ctrlWrapper } = require("../../helpers");
const getCurrent = require("./getCurrent");
const updataAvatar = require("./updataAvatar");

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updataAvatar: ctrlWrapper(updataAvatar),
};
