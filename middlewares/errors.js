module.exports = function (err, req, res, next) {
  if (res.headersSent) return next(err);

  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.name === "Validation Error") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // For errors that I throw
  if (err.statusCode && err.message) message = err.message;

  res.status(statusCode).json({ message });
};
