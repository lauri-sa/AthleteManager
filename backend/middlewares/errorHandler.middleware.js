// Import the required modules
const bottle = require("../config/di-container");
const { ValidationError } = require("sequelize");

// Get the errorLogger instance from the DI container
const errorLogger = bottle.container.ErrorLogger;

// Middleware to log the error
const errorLoggerMiddleware = (err, req, res, next) => {
  errorLogger.error(err);
  next(err);
};

// Middleware to respond to the error
const errorResponderMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    // If the error is a validation error, return the error message
    return res.status(400).json(err.message);
  }

  // If the error is not a validation error, return a generic
  return res.status(500).json({ message: "Internal Server Error." });
};

// Export the middleware functions
module.exports = {
  errorLoggerMiddleware,
  errorResponderMiddleware,
};
