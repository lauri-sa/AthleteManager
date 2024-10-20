const bottle = require("../config/di-container");

const { getAllAthletes, createAthlete, updateAthlete, deleteAthlete } = bottle.container.AthleteServices;

const getAllAthletesController = async (req, res, next) => {
  try {
    if (req.notModified) {
      return res.status(304).end();
    }

    if (req.cacheData) {
      return res.status(200).json(req.cacheData);
    }

    const athletes = await getAllAthletes();

    req.data = athletes;
    next();

    return res.status(200).json(athletes);
  } catch (err) {
    next(err);
  }
};

const createAthleteController = async (req, res, next) => {
  try {
    const athletes = await createAthlete(req.body);

    req.data = athletes;
    next();

    return res.status(201).json(athletes);
  } catch (err) {
    next(err);
  }
};

const updateAthleteController = async (req, res, next) => {
  try {
    const athletes = await updateAthlete(req.params.id, req.body);

    req.data = athletes;
    next();

    return res.status(200).json(athletes);
  } catch (err) {
    next(err);
  }
};

const deleteAthleteController = async (req, res, next) => {
  try {
    const athletes = await deleteAthlete(req.params.id);

    req.data = athletes;
    next();

    return res.status(200).json(athletes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAthletesController,
  createAthleteController,
  updateAthleteController,
  deleteAthleteController,
};
