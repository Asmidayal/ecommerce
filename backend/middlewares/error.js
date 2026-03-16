import handleError from "../utils/handleError.js";
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // cast error handling for mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new handleError(message, 404);
  }

  //duplicate key error handling for mongoose
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} already entered`;
    err = new handleError(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}