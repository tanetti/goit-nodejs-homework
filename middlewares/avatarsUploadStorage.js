const multer = require("multer");
const path = require("path");

const tempPath = path.resolve("./temp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const { _id } = req.user;
    const currentUserId = _id.toString();
    const [, extension] = file.originalname.split(".");

    cb(null, `${currentUserId}.${extension}`);
  },
});

const uploadStorage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");

    if (file.mimetype !== "image/jpeg") {
      return cb(new Error("Avatar must be a JPEG file"));
    }

    if (extension !== "jpg") {
      return cb(new Error("Avatar extension must be a .jpg"));
    }

    cb(null, true);
  },
});

const avatarsUploadStorage = uploadStorage.single("avatar");

module.exports = avatarsUploadStorage;
