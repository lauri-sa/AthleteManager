const bottle = require("../config/di-container");

const { getAllSports, createSport } = bottle.container.SportServices;

const getAllSportsController = async (req, res, next) => {
  try {
    const sports = await getAllSports();
    return res.status(200).json(sports);
  } catch (err) {
    next(err);
  }
};

const createSportController = async (req, res, next) => {
  try {
    const sports = await createSport(req.body);
    return res.status(201).json(sports);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSportsController,
  createSportController,
};
