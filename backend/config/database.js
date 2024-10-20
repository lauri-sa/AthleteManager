const bottle = require("./di-container");
const { Sequelize, DataTypes } = require("sequelize");

const infoLogger = bottle.container.InfoLogger;
const errorLogger = bottle.container.ErrorLogger;

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

const db = {
  sequelize,
  models: {
    Athlete: require("../models/athlete.model")(sequelize, DataTypes),
    Achievement: require("../models/achievement.model")(sequelize, DataTypes),
    Sport: require("../models/sport.model")(sequelize, DataTypes),
  },
};

Object.values(db.models).forEach((model) => {
  model.associate?.(db.models);
});

bottle.provider("DB", function () {
  this.$get = function () {
    return db;
  };
});
