// Important: This is the entry point of the application. This file is responsible for starting the server and setting up the routes.
// These are required for the DI container and environment variables to be loaded before the server starts.
// Do not change the order.
require("dotenv").config();
require("./services/winstonLogger.service");
require("./config/database");
require("./services/athlete.service");
require("./services/sport.service");

// Middleware and routes imports
const cors = require("cors");
const express = require("express");
const bottle = require("./config/di-container");
const morgan = require("./middlewares/morgan.middleware");
const athletesRouter = require("./routes/athletes.route");
const sportsRouter = require("./routes/sports.route");
const { errorLoggerMiddleware, errorResponderMiddleware, } = require("./middlewares/errorHandler.middleware");

// Get the logger instances from the DI container
const infoLogger = bottle.container.InfoLogger;
const errorLogger = bottle.container.ErrorLogger;

// Get the PORT from the environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET, POST, PUT, DELETE methods
  allowedHeaders: ["Content-Type"],
};

// Create an express app
const app = express();

// Set up the express app with the required middlewares and routes.
// The order of the middlewares is important.
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan);

app.use("/api/athletes", athletesRouter);
app.use("/api/sports", sportsRouter);

app.use(errorLoggerMiddleware);
app.use(errorResponderMiddleware);

// Start the server on the specified PORT and log the success/error message
app.listen(PORT, (err) => {
  if (err) {
    errorLogger.error(err);
    process.exit(1);
  }
  infoLogger.info(`Server is running on PORT ${PORT}`);
});
