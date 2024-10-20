const moment = require("moment");
const { join } = require("path");
const { existsSync, mkdirSync } = require("fs");
const bottle = require("../config/di-container");
const DailyRotateFile = require("winston-daily-rotate-file");
const { createLogger, transports, format } = require("winston");

const { Console } = transports;
const { combine, timestamp, printf, errors } = format;

const logsDir = join(__dirname, "../logs");

const getCurrentDate = moment().format("YYYY-MM-DD");

existsSync(logsDir) || mkdirSync(logsDir);

const createCustomLogger = (level) => {
  return createLogger({
    level: level,
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      printf(({ timestamp, level, message, stack }) => {
        const logObject = message.timestamp
          ? { level, ...message }
          : { level, timestamp, message, stack };
        return JSON.stringify(logObject, null, 1);
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: join(logsDir, `%DATE%.${level}`),
        datePattern: "YYYY-MM-DD",
        extension: ".log",
        maxSize: "10m",
        maxFiles: "7d",
        auditFile: join(logsDir, `${getCurrentDate}.${level}.log.audit.json`),
      }),
      new Console(),
    ],
  });
};

bottle.provider("InfoLogger", function(){
  this.$get = function() {
      return createCustomLogger("info");
  }
});

bottle.provider("ErrorLogger", function(){
  this.$get = function() {
      return createCustomLogger("error");
  }
});