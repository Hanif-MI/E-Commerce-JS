import multer from "multer";
import { allowedMimeTypes, RESPONSE_CODE } from "../utility/constant.js";
import { errorResponseWithoutData } from "../utility/response.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const lastDotIndex = file.originalname.lastIndexOf('.');
    
    const extension = file.originalname.substring(lastDotIndex + 1);
    cb(null, uniqueSuffix + '.'+extension);

  },
});

const upload = multer({ storage: storage });

const uploadSingleMediaMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    // Handle multer upload error
    if (err) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        err.message
      );
    }

    // Check if file exists
    if (!req.file)
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.BAD_REQUEST,
        "No file uploaded"
      );

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: `Only ${allowedMimeTypes.join(
          ", "
        )} files are allowed. Received: ${req.file.mimetype}`,
      });
    }

    // Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size allowed is ${
          maxSize / 1024 / 1024
        }MB`,
      });
    }

    next();
  });
};

export { uploadSingleMediaMiddleware };
