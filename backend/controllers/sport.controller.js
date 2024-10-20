// Import DI container
const bottle = require("../config/di-container");

// Desctructure services from DI container
const { getAllSports, createSport } = bottle.container.SportServices;

// Get all sports controller function
const getAllSportsController = async (req, res, next) => {
  try {
    // Get all sports from service function
    const sports = await getAllSports();
    // Return response to client
    return res.status(200).json(sports);
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Create sport controller function
const createSportController = async (req, res, next) => {
  try {
    // Create sport from service function
    const sports = await createSport(req.body);
    // Return response to client
    return res.status(201).json(sports);
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

// Export all controllers
module.exports = {
  getAllSportsController,
  createSportController,
};
