require("dotenv").config();
require("./services/winstonLogger.service");
require("./config/database");
require("./services/athlete.service");
require("./services/sport.service");

const cors = require("cors");
const express = require("express");
const bottle = require("./config/di-container");
const morgan = require("./middlewares/morgan.middleware");
const athletesRouter = require("./routes/athletes.route");
const sportsRouter = require("./routes/sports.route");
const { errorLoggerMiddleware, errorResponderMiddleware, } = require("./middlewares/errorHandler.middleware");

const infoLogger = bottle.container.InfoLogger;
const errorLogger = bottle.container.ErrorLogger;

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan);

app.use("/api/athletes", athletesRouter);
app.use("/api/sports", sportsRouter);

app.use(errorLoggerMiddleware);
app.use(errorResponderMiddleware);

app.listen(PORT, (err) => {
  if (err) {
    errorLogger.error(err);
    process.exit(1);
  }
  infoLogger.info(`Server is running on PORT ${PORT}`);
});
