const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

// налаштування multer
const multerConfig = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, tempDir);
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

// middelware multer
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
