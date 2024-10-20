// Import the dependency injection container
const bottle = require("./di-container");

// Import Sequelize and DataTypes from sequelize package
const { Sequelize, DataTypes } = require("sequelize");

// Get the loggers from the DI container
const infoLogger = bottle.container.InfoLogger;
const errorLogger = bottle.container.ErrorLogger;

// Destructure environment variables for database configuration
const {
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DIALECT,
  POOL_MAX,
  POOL_MIN,
  POOL_ACQUIRE,
  POOL_IDLE,
} = process.env;

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DIALECT,
  operatorAliases: false,
  pool: {
    max: parseInt(POOL_MAX, 10),
    min: parseInt(POOL_MIN, 10),
    acquire: parseInt(POOL_ACQUIRE, 10),
    idle: parseInt(POOL_IDLE, 10),
  },
  define: {
    timestamps: false,
  },
  logging: (msg) => {
    infoLogger.info(msg);
  },
  retry: {
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError,
      Sequelize.ConnectionAcquireTimeoutError,
    ],
    max: 5,
    backoffBase: 2000,
    backoffExponent: 1.5,
  },
});

// Authenticate the database connection
(async () => {
  try {
    await sequelize.authenticate();
    infoLogger.info(
      "Connection to the database has been established successfully."
    );
  } catch (err) {
    errorLogger.error(err);
  }
})();

// Define the database object with sequelize instance and models
const db = {
  sequelize,
  models: {
    Athlete: require("../models/athlete.model")(sequelize, DataTypes),
    Achievement: require("../models/achievement.model")(sequelize, DataTypes),
    Sport: require("../models/sport.model")(sequelize, DataTypes),
  },
};

// Set up associations between models if they exist
Object.values(db.models).forEach((model) => {
  model.associate?.(db.models);
});

// Provide the database object through the DI container
bottle.provider("DB", function () {
  this.$get = function () {
    return db;
  };
});