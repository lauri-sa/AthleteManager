// Import required modules
const morgan = require("morgan");
const bottle = require("../config/di-container");

// Get the infoLogger instance from the DI container
const infoLogger = bottle.container.InfoLogger;

// Define the log structure
const logStructure = `
:date[clf]
:remote-addr
:method
:url
:http-version
:status
:res[content-length]
:response-time ms
:user-agent`;

// Set up the morgan middleware to log the requests
module.exports = morgan(logStructure, {
  skip: (req, res) => {
    return res.statusCode >= 400; // Skip logging the error responses
  },
  stream: { // Write the logs to the infoLogger
    write: (message) => {
      const tokens = message.trim().split("\n"); // Split the message into tokens
      const logObject = { // Create the log object from the tokens
        timestamp: tokens[0],
        remoteAddr: tokens[1], 
        method: tokens[2],
        url: tokens[3],
        httpVersion: tokens[4],
        status: tokens[5],
        contentLength: tokens[6],
        responseTime: tokens[7],
        userAgent: tokens[8],
      };
      infoLogger.info(logObject); // Log the object
    },
  },
});
