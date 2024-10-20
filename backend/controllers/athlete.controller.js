// Import DI container
const bottle = require("../config/di-container");

// Destructure services from DI container
const { getAllAthletes, createAthlete, updateAthlete, deleteAthlete } = bottle.container.AthleteServices;

// Get all athletes controller method
const getAllAthletesController = async (req, res, next) => {
  try {
    // Cache check middleware will run first and if the data is cached or not modified, it will return the response immediately
    if (req.notModified) {
      return res.status(304).end();
    }

    if (req.cacheData) {
      return res.status(200).json(req.cacheData);
    }

    // Get all athletes from the database using the service
    const athletes = await getAllAthletes();

    // Set the data to the request object
    req.data = athletes;
    // Call the next middleware that will handle the caching
    next();

    // Return the response to the client
    return res.status(200).json(athletes);
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
};

// Create athlete controller method
const createAthleteController = async (req, res, next) => {
  try {
    // Create athlete using the service
    const athletes = await createAthlete(req.body);

    // Set the data to the request object
    req.data = athletes;
    // Call the next middleware that will handle the caching
    next();

    // Return the response to the client
    return res.status(201).json(athletes);
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
};

const updateAthleteController = async (req, res, next) => {
  try {
    // Update athlete using the service
    const athletes = await updateAthlete(req.params.id, req.body);

    // Set the data to the request object
    req.data = athletes;
    // Call the next middleware that will handle the caching
    next();

    // Return the response to the client
    return res.status(200).json(athletes);
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
};

// Delete athlete controller method
const deleteAthleteController = async (req, res, next) => {
  try {
    // Delete athlete using the service
    const athletes = await deleteAthlete(req.params.id);

    // Set the data to the request object
    req.data = athletes;
    // Call the next middleware that will handle the caching
    next();

    // Return the response to the client
    return res.status(200).json(athletes);
  } catch (err) {
    next(err); // Pass the error to the error handler middleware
  }
};

// Export all the methods
module.exports = {
  getAllAthletesController,
  createAthleteController,
  updateAthleteController,
  deleteAthleteController,
};
