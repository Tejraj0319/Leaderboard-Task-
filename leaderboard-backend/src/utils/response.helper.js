exports.sendResponse = (res, statusCode, message, data = null, isError = false) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    data,
    isError,
  });
};
