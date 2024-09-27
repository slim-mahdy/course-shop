const path = require("path");
const multer = require("multer");

module.exports = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "courses", "covers"));
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + Math.floor(Math.random() * 999);

    const ext = path.extname(file.originalname);
    cb(null,filename + ext);
  },
});
