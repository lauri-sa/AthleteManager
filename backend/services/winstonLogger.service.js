// Import required modules
const moment = require("moment");
const { join } = require("path");
const { existsSync, mkdirSync } = require("fs");
const bottle = require("../config/di-container");
const DailyRotateFile = require("winston-daily-rotate-file");
const { createLogger, transports, format } = require("winston");

// Destructure required modules
const { Console } = transports;
const { combine, timestamp, printf, errors } = format;

// Define logs directory
const logsDir = join(__dirname, "../logs");

// Get current date in YYYY-MM-DD format
const getCurrentDate = moment().format("YYYY-MM-DD");

// Check if logs directory exists, if not create it
existsSync(logsDir) || mkdirSync(logsDir);

// Create custom logger function to create loggers for different log levels
const createCustomLogger = (level) => {
  return createLogger({
    level: level, // Set log level
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp to logs in YYYY-MM-DD HH:mm:ss format
      errors({ stack: true }), // Include stack trace in logs
      printf(({ timestamp, level, message, stack }) => { // Define log object structure
        const logObject = message.timestamp 
          ? { level, ...message } 
          : { level, timestamp, message, stack };
        return JSON.stringify(logObject, null, 1); // Return log object as JSON string
      })
    ),
    transports: [ // Define transports for logs. Transports are where logs are stored.
      new DailyRotateFile({ // Log to file with daily rotation
        filename: join(logsDir, `%DATE%.${level}`), // Define log file name
        datePattern: "YYYY-MM-DD", 
        extension: ".log", 
        maxSize: "10m", // Define max size of log file, if exceeded, new file is created
        maxFiles: "7d", // Define max number/time of log files to keep before deleting old files
        auditFile: join(logsDir, `${getCurrentDate}.${level}.log.audit.json`), // Define audit file to keep track of log files
      }),
      new Console(), // Log to console
    ],
  });
};

// Define providers for different log levels to be used in DI container
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