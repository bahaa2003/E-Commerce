import multer from "multer";
import { AppError } from "../utils/AppError.js";

let options = (folderName)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cd(new AppError("image only supported", 400), false);
    }
  }
  return multer({ storage, fileFilter });

}

export const uploadsSingleFile = (fieldname , folderName) => options(folderName).single(fieldname);

export const uploadMixOfFiles = (arrayOfFields , folderName) => options(folderName).fields(arrayOfFields);