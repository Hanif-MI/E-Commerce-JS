import { ApiError } from "../utility/api_error.js";

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    console.error("UNEXPECTED ERROR 💥", err); // log server crashes
    statusCode = 500;
    message = "Something went wrong : " + err;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export { errorHandler };
