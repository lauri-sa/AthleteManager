const bottle = require("../config/di-container");
const { ValidationError } = require("sequelize");

const errorLogger = bottle.container.ErrorLogger;

const errorLoggerMiddleware = (err, req, res, next) => {
  errorLogger.error(err);
  next(err);
};

const errorResponderMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json(err.message);
  }

  return res.status(500).json({ message: "Internal Server Error." });
};

module.exports = {
  errorLoggerMiddleware,
  errorResponderMiddleware,
};
