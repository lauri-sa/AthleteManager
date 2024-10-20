const morgan = require("morgan");
const bottle = require("../config/di-container");

const infoLogger = bottle.container.InfoLogger;

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

module.exports = morgan(logStructure, {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: {
    write: (message) => {
      const tokens = message.trim().split("\n");
      const logObject = {
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
      infoLogger.info(logObject);
    },
  },
});
