const { ctrlWrapper } = require("../../helpers");
const getCurrent = require("./getCurrent");
const updataAvatar = require("./updataAvatar");
const verifyEmail = require("./verifyEmail");

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updataAvatar: ctrlWrapper(updataAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
};
