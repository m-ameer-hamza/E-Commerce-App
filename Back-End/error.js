class globalErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith(4) ? "Fails" : "Error";
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = globalErrors;
