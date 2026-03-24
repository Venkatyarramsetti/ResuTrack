export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Server error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
}